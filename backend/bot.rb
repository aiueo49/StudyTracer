require "dotenv/load"
require "discordrb"

# Create a bot with a token
bot = Discordrb::Bot.new token: ENV['DISCORD_BOT_TOKEN'], client_id: ENV['DISCORD_CLIENT_ID']

# テストのためのコードのため、コメントアウト
# # Respond to "Ping!" with "Pong!"
# bot.message(with_text: "Ping!") do |event|
#   event.respond "Pong!"
# end

# bot start
bot.run