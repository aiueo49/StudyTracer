require "dotenv/load"
require "discordrb"
require "./config/environment.rb"

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
    user = User.find_by(name: event.user.name)
    user_page_url = "http://localhost:3000/users/#{user.id}"
    exit_message = exit_messages.sample % {name: event.user.name}
    event.user.pm("#{exit_message} あなたのページはこちら: #{user_page_url}")
  end
end

# ユーザーが入室した時にユーザーネームとユーザーアイコンと入室時刻(タイムスタンプ)を取得し、データベースに保存する
bot.voice_state_update do |event|
  if event.channel
    User.create(
      name: event.user.name,
      avatar_url: event.user.avatar_url,
    )
  end
end

# ユーザーが入室した時にStudyTimeテーブルに新しいレコードを作成する
bot.voice_state_update do |event|
  if event.channel
    user = User.find_by(name: event.user.name)
    StudyTime.create(
      user_id: user.id,
      start_time: Time.now,
    )
  end
end

# bot start
bot.run
