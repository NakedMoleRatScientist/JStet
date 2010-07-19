require 'net/ftp'
if File.exist?("secret.rb")
  require 'secret.rb'
end

task :db => [:delete,:create]
task :deploy => [:concat]
task :copy => [:concat]
task :concat do
  sh "rm game.js"
  sh "cat client/network/lobby_protocol.js client/models/chat.js client/network/game_protocol.js client/modes/title.js client/models/scoreboard.js client/network/score_protocol.js client/network/net.js client/models/high_score.js client/models/text.js client/models/title_key.js client/models/enter_score_key.js client/models/typing.js client/modes/game_over.js client/models/game_over_key.js client/models/key_pressed.js client/models/score_key.js client/models/game_key.js  client/models/timer_action.js client/models/playfield.js client/models/playfield_draw.js client/models/tetromino.js client/models/j_shape.js client/models/i_shape.js client/models/l_shape.js client/models/o_shape.js client/models/z_shape.js client/models/s_shape.js client/models/t_shape.js client/models/shape_selection.js client/models/tetromino_draw.js client/modes/mode.js client/modes/engine.js > game.js"
end

task :copy do
  sh "cp jstet.html /srv/http"
  sh "cp game.js /srv/http"
  sh "cp -r vendor /srv/http"
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

