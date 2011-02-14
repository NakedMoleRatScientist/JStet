require 'net/ftp'
if File.exist?("secret.rb")
  require 'secret.rb'
end
os = RUBY_PLATFORM

task :db => [:delete,:create]
task :deploy => [:concat]
task :copy => [:concat]
task :concat do
  sh "rm game.js"
  sh "cat client/network/lobby_protocol.js client/models/instruction.js client/models/play_button.js client/ui/text_button.js client/ui/rect_object.js client/models/chat.js client/network/game_protocol.js client/models/private_button.js client/models/pass_effects.js client/models/password_effects.js client/models/submit_effects.js client/models/name_effects.js client/pages/game_list_page.js client/pages/name_page.js client/pages/pass_entry_page.js client/pages/password_page.js client/models/players_effects.js client/pages/players_page.js client/ui/info.js client/ui/data_collect.js client/ui/turn_event.js client/ui/page_effect.js client/ui/pages.js client/ui/radio_switch.js client/ui/radio_button.js client/models/create_key.js client/modes/create_game.js client/modes/title.js client/modes/scoreboard.js client/network/search_protocol.js client/network/list_protocol.js client/network/score_protocol.js client/network/net.js client/modes/high_score.js client/ui/input.js client/models/chat_key.js client/models/title_key.js client/models/create_mouse.js client/models/lobby_mouse.js client/ui/collision_effects.js client/ui/collision.js client/models/enter_high_score_key.js client/ui/typing.js client/modes/game_over.js client/models/game_over_key.js client/models/mouse_clicked.js client/models/key_pressed.js client/models/score_key.js client/models/game_key.js  client/models/timer_action.js client/models/playfield.js client/models/playfield_draw.js client/models/tetromino.js client/models/j_shape.js client/models/i_shape.js client/models/l_shape.js client/models/o_shape.js client/models/z_shape.js client/models/s_shape.js client/models/t_shape.js client/models/shape_selection.js client/models/tetromino_draw.js client/models/lobby_effects.js client/ui/effect.js client/ui/ui_object.js client/modes/lobby.js client/modes/list_game.js client/modes/waiting.js client/models/search_ui.js client/modes/mode.js client/models/player.js client/modes/engine_draw.js client/modes/engine.js > game.js"
end

task :copy do
  if os == "i486-linux"
    sh "cp jstet.html /var/www/"
    sh "cp game.js /var/www/"
    sh "cp -r vendor /var/www/"
  else
    sh "cp jstet.html /srv/http"
    sh "cp game.js /srv/http"
    sh "cp -r vendor /srv/http"
  end
end

task :test do
  sh "node test/delete.db.js"
  sh "node test/create.db.js"
  sh "node test/score.db.test.js"
end

task :deploy do
  ftp = Net::FTP.new()
  ftp.connect("kibabase.com",21)
  ftp.login(USER,PASS)
  ftp.chdir("kibabase.com")
  ftp.put("game.js")
  ftp.put("jstet.html")
  ftp.close()
end

task :start do
  sh "node server/server.js"
end

task :create do
 sh "node server/create.js"
end

task :delete do
 sh "node server/delete.js"
end

