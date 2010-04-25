set :application, "JStet"
set :user, "hackerkiba"
set :repository,  "git://github.com/kiba/JStet.git"
set :deploy_root, "kibabase.com"
set :scm, :git
set :branch, "master"
# Or: `accurev`, `bzr`, `cvs`, `darcs`, `git`, `mercurial`, `perforce`, `subversion` or `none`

role :web, "kibabase.com"

task :cold_deploy do
  run "git clone #{repository}; git checkout -b #{branch} --track origin/#{branch}"
end

task :the_deploy do
  run "git checkout #{branch}; git pull origin #{branch}"
end
