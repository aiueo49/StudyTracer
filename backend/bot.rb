require "dotenv/load"
require "discordrb"
require "./config/environment.rb"
require "digest"

# Create a bot with a token
bot = Discordrb::Bot.new token: ENV['DISCORD_BOT_TOKEN'], client_id: ENV['DISCORD_CLIENT_ID']

# ユーザーが入室したときに返すメッセージのパターンを用意
enter_messages = [
  "ようこそ、%{name} さん！",
  "いらっしゃい、%{name} さん！",
  "おかえりなさい、%{name} さん！",
  "お疲れ様です、%{name} さん！",
]

# ユーザーが入室したときメッセージを返す
bot.voice_state_update do |event|
  if event.channel
    event.user.pm(enter_messages.sample % {name: event.user.name})
  end
end

# ユーザーが退室したときに返すメッセージのパターンを用意
exit_messages = [
  "またね、%{name} さん！",
  "お疲れ様でした、%{name} さん！",
  "また来てね、%{name} さん！",
]

# ユーザーが退室したときメッセージを返す
bot.voice_state_update do |event|
  # ユーザーが以前にいたチャンネル（event.old_channel）が存在し、ユーザーが現在いるチャンネル（event.channel）が存在しない場合にtrueになります。これは、ユーザーがボイスチャンネルから退出したときに該当します。
  if event.old_channel && event.old_channel
    # ユーザーが退室したときに、ユーザーページのURLをメッセージとともに送信する
    user = User.find_by(discord_id: event.user.id)
    # DiscordIDと現在時刻を引数に渡し、トークン(ハッシュ)を作成する
    token = Digest::MD5.hexdigest("#{user.discord_id}#{Time.now}")
    # トークンをデータベースに保存する
    user.update(token: token)
    # トークンを含むユーザーページのURLを作成する
    user_page_url = "http://localhost:3000/users/#{token}"
    # メッセージを作成する
    exit_message = exit_messages.sample % {name: event.user.name}
    # メッセージを送信する
    event.user.pm("#{exit_message} あなたのページはこちら: #{user_page_url}")
  end
end

# ユーザーが入室した時にユーザー情報を取得、データベースに保存する
bot.voice_state_update do |event|
  if event.channel
    user = User.find_by(discord_id: event.user.id)
    # ユーザーがデータベースに存在する場合は、ユーザー情報を更新する
    if user
      user.update(discord_id: event.user.id, avatar_url: event.user.avatar_url)
    # ユーザーがデータベースに存在しない場合は、新しいユーザー情報を作成する
    else
      User.create(
        discord_id: event.user.id, # Discordでの一意のユーザーID
        name: event.user.name,
        avatar_url: event.user.avatar_url,
      )
      puts "テスト：ユーザーが入室しました: #{event.user.id}, #{event.user.name}, #{event.user.avatar_url}"
    end
  end
end

# ユーザーが入室した時にStudyTimeテーブルに新しいレコードを作成する
bot.voice_state_update do |event|
  if event.channel
    user = User.find_by(discord_id: event.user.id)
    StudyTime.create(
      user_id: user.id,
      start_time: Time.now,
    )
  end
end

# ユーザーが退室した時にStudyTimeテーブルのレコードを更新する
bot.voice_state_update do |event|
  if event.channel.nil?
    user = User.find_by(discord_id: event.user.id)
    study_time = StudyTime.where(user_id: user.id, end_time: nil).last
    study_time.update(end_time: Time.now) if study_time
  end
end

# bot start
bot.run
