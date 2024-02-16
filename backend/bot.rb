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

# bot start
bot.run
