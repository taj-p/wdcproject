# UG05

## 1. 
Ensure you have git installed on your computer. Intstall github off of the website. This will also download a GUI which can be used instead of terminal commands. (Note: Its not that good)

## 2.
You only need to clone the github repository once onto your computer. Every time after that to update your git to the latest version use the command:
```
git clone https://github.cs.adelaide.edu.au/SEP2018/UG05.git
//Clones the URL
```
or 
```
git pull
//Updates all files to the current version on the repository.
```
## 3.
If you are working on a certain section of the code and there is a branch you want to work on that already exists use the commmand:
```
git pull
//To get the latest versions

git checkout Enter_branch_Name
//Changes your branch to the branch name
```
This will update the git to be working in your branch.

## 4. 
You need to add all of the files you are editting in the folder using the command:
```
git add File_name
```
This means that the files are being tracked for commits.


## 5.
To make a change to the current branch you are in you need to commit your code using:
```
git commit -m “Message here.”
```
Your message should describe the changes you made.

## 6.
Once you are happy with your code and want to publish it to the branch you use the command:
```
git push
```
## 7.
The Final part is to merge your current branch into the master branch. You need to request a review of your code in the Slack and have someone read over your code and ensure that the files follow the standards outlined in the configuration document. IE google coding standards, etc

First you need to change your working branch to the branch you want to merge to (Most likely the master branch)
```
git checkout master

git merge Branch Name to merge
```
There may be conflicts that need resolving!

Example:



## git clone "Github link here"
This will clone the github repository to your local drive. It will create the file in the current directory so make sure you put it in the right spot first.
You should only have to clone once. Unless you want a fresh start from the repository. 

## git config --global user.name <"Your Name Here">  
This will configure your name to the git commands made, for example if you merge something we can tell by glancing that you did the merge. Just using first names is fine.
This command might not be nessesary if you have a git account setup, which you all do but it doesnt hurt anything.

## h2{git help} 
Forgot a command? Type this into the command line to bring up the 21 most common git commands. You can also be more specific and type “git help init” or another term to figure out how to use and configure a specific git command.

## git add
This does not add new files to your repository. Instead, it brings new files to Git’s attention. After you add files, they’re included in Git’s “snapshots” of the repository.

## git commit 
Git’s most important command. After you make any sort of change, you input this in order to take a “snapshot” of the repository. Usually it goes git commit -m “Message here.” The -m indicates that the following section of the command should be read as a message.

## git branch
Working with multiple collaborators and want to make changes on your own? This command will let you build a new branch, or timeline of commits, of changes and file additions that are completely your own. Your title goes after the command. If you wanted a new branch called “cats,” you’d type git branch cats.

## git checkout
Literally allows you to “check out” a repository that you are not currently inside. This is a navigational command that lets you move to the repository you want to check. You can use this command as git checkout master to look at the master branch, or git checkout cats to look at another branch.

## git merge
When you’re done working on a branch, you can merge your changes back to the master branch, which is visible to all collaborators. git merge cats would take all the changes you made to the “cats” branch and add them to the master.

## git push
If you’re working on your local computer, and want your commits to be visible online on GitHub as well, you “push” the changes up to GitHub with this command.

## git pull
If you’re working on your local computer and want the most up-to-date version of your repository to work with, you “pull” the changes down from GitHub with this command.
