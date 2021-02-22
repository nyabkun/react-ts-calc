# function test_arg() {
#   # func name
#   echo '$args[0]' = $args[0]
#   # all args
#   echo '$args' = $args
#   # first arg
#   echo '$args[1]' = $args[1]
#   # python --help >> _hoge.md
# }

## Util

function pipe() {
  local outfile=C:/msys64/home/owner/pipe.md
  $args | Out-File -FilePath $outfile
  code $outfile
}

## App

function play_mpc_be() { C:/App/MediaPlayerClassic-BE/mpc-be64.exe }
function code() { C:/Dev/VSCode/Code.exe }

## Dir

## Generate alias : RegEx replace
#
# export d_(\w+)=.*$
# >>>
# alias cd_$args[1]='cd $$d_$args[1]'

$d_diary='C:/Ws/diary'
$d_ws='C:/Ws'
$d_mypaint='C:/Ws/mypaint'
$d_A='E:/Archive/Video/Actress'
$d_New='E:/Archive/_New'
$d_App='C:/App'
$d_AppInst='C:/AppInst'
$d_Dev='C:/Dev'

function cd_diary() { cd $d_diary }
function cd_ws() { cd $d_ws }
function cd_mypaint() { cd $d_mypaint }
function cd_A() { cd $d_A }
function cd_New() { cd $d_New }
function cd_App() { cd $d_App }
function cd_AppInst() { cd $d_AppInst }
function cd_Dev() { cd $d_Dev }

# Set-Alias -Name mp -Value 'mypaint'

## Util Alias

function la() { ls -a }
function ll() { ls -al }
function left() { ls -t -1 }
function exp_open_here() { explorer . }

## Git Alias

function git_hist() { git log --oneline --graph --decorate --all }
function git_com() { git commit --allow-empty-message --no-edit }
function git_conf_global() { git config --global --edit }
function git_conf_local() { git config --edit }
function git_add_com_push() {
	git add -A
  git commit --allow-empty-message --no-edit
  git push
}

## Edit

function edit_alias(){
  code C:/msys64/home/owner/.alias.zsh
}
function edit_alias_sh_only(){
  code C:/msys64/home/owner/.alias-sh.zsh
}
function edit_zshrc() {
  code C:/msys64/home/owner/.zshrc
}
function edit_pwsh_profile(){
  code C:/Users/owner/Documents/PowerShell/Microsoft.PowerShell_profile.ps1
}

## Env

# @Nyab D_2021-02-17
$env:PKG_CONFIG_PATH += ";C:/msys64/usr/local/lib/pkgconfg"
$env:PKG_CONFIG_PATH += ";C:/msys64/usr/local/share/pkgconfig"

## Build

Set-Alias -Name pm -Value 'mypaint'
Set-Alias -Name paint -Value 'mypaint'

function mypaint() {
  cd $d_mypaint
  python 'c:/ws/mypaint/build/scripts-3.8/mypaint.py'
}
function mypaint_build(){
  cd $d_mypaint
  python 'c:/ws/mypaint/setup.py' build
}
echo "Loaded : $PSCommandPath"