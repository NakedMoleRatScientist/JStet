require 'net/ftp'
require 'secret.rb'

task :deploy => [:concat]
task :concat do
  sh "rm game.js"
  sh "cat app/models/timer_action.js app/models/playfield.js app/models/playfield_draw.js app/models/tetromino.js app/models/j_shape.js app/models/i_shape.js app/models/l_shape.js app/models/o_shape.js app/models/z_shape.js app/models/s_shape.js app/models/t_shape.js app/models/shape_generator.js app/models/tetromino_draw.js app/modes/engine.js > game.js"
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