Full Name: Aaron Li
Vanderbilt Email: aaron.li@vanderbilt.edu

## Instructions
Swiftometer is a React project. Once one has React, to run the program, several
packages have to be installed.
- For the backend: express, axios, cors
- For the frontend: react-select

To use Swiftometer, the user just has to select an album through the select box. 
A lyric from that album will be automatically generated and shown (except for 1989
-- see explanation at the bottom). If the user does not like the lyric they are
shown, they can change the album and that should load a new lyric. Sometimes, the 
album is just one song and snippet. Once the user guesses the song, they must switch 
to a new one because of a characteristic of the getSnippet function that prevents a 
duplicate snippet from showing. Each snippet in multiple song and multiple snippet 
albums is guarunteed to be different from the last.

Once the user has typed their guess into the "Enter Song Name Here" textfield and 
clicked the submit button, their response will be compared to the actual song name. 
To get a correct guess, the spelling must exactly match the full name of the song 
(e.g. Love Story is not the same as Love Story (Taylor's Version)). However, 
capitalization does not matter. If their guess is correct, the number next to the 
Correct Guesses display will increase by 1. Swiftometer will continue giving lyrics 
until the Musixmatch API calls run out or the user clicks the End Game Button. When 
the game is over, the game startistics and a mean message will load at the bottom 
(with Swiftometer, you can do no right).

## Bugs/Features that should be improved
Before I get to the reflection, there are several bugs/poor UX features I have found 
but have struggled to fix in my code. 
1. Slow lyric displays. Due to being on the free version of the API, sometimes the 
snippet provided will not be in the 30% of song lyrics I am allowed to access. To get 
around this, I call getSnippet recursively multiple times and eventually try to 
switch the song to get a new snippet. As this is random, this sometimes leads to 
lyrics loading outrageously slowly. If the user is struggling with the wait, 
switching to a new album on the selector will bypass this process but it is possible 
that later on a random lyric will load and replace the one they're working on.

2. For some reason, the Rest API built struggles to load songs from 1989 without 
crashing. I have explored various workarounds and can't seem to get why this is the 
only one that consistently fails to be fetched. Occasionally a couple songs will 
load, but for the most part, it is inaccessible as it will crash the backend server. 
It says that the response is undefined and that the length can't be taken to find an 
appropriate track. However, when examining the API link and seeing the typeof of the 
response, it is an array and should work. It works for all the other albums but for 
some reason it does not work for 1989.

3. Snippets on one-track, one-snippet albums like You All Over Me (feat. Maren 
Morris) (Taylor's Version) (From The Vault). While the getSnippet preventing 
duplicate snippets is a nice feature, it prevents the submit button from getting a 
new lyric as no snippet qualifies. The user is forced to change the album. While this 
could be automatically done, I thought that auto-changing the user's album selection 
wouldn't be that much better. I couldn't think of a definitvely best solution since I 
like the no back-to-back same snippet feature so I stuck with it.

