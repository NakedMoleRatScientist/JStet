set :application, "jstet"
set :user, "kiba"
set :repository,  "git://github.com/kiba/JStet.git"
set :deploy_to, "/home/kiba/projects/jstet"
set :scm, :git
set :use_sudo, false
set :branch, "master"
# Or: `accurev`, `bzr`, `cvs`, `darcs`, `git`, `mercurial`, `perforce`, `subversion` or `none`

server "jstet.kibabase.com", :app, :primary => true
