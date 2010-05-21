require 'net/ftp'
require 'secret.rb'

task :deploy do
  ftp = Net::FTP.new()
  ftp.connect("kibabase.com",21)
  ftp.login(USER,PASS)
  ftp.chdir("kibabase.com")
  ftp.put("game.js")
  ftp.put("jstet.html")
  ftp.close()
end