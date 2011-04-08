set :application, "jstet"
set :user, "kiba"
set :repository,  "git://github.com/kiba/JStet.git"
set :deploy_to, "/home/kiba/projects/jstet"
set :scm, :git
set :branch, "master"
# Or: `accurev`, `bzr`, `cvs`, `darcs`, `git`, `mercurial`, `perforce`, `subversion` or `none`

role :web, "jstet.kibabase.com"

namespace :deploy do
   desc <<-DESC
  A macro-task that updates the code and fixes the symlink. 
  DESC
  task :default do 
    transaction do 
      update_code
      symlink
    end
  end
 
  task :update_code, :except => { :no_release => true } do 
    on_rollback { run "rm -rf #{release_path}; true" } 
    strategy.deploy! 
  end
 
  task :after_deploy do
    cleanup
  end
end
