require "dotenv/load"
require "discordrb"

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
    event.user.pm(exit_messages.sample % {name: event.user.name})
  end
end

# bot start
bot.run
