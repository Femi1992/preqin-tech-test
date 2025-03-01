# Preqin Technical Interview

Hello! If you are reading this, then we're in the process of chatting with you about a technical role at Preqin. Congratulations!

To move forward, we'd like to know a bit about how you work. We'd like you to demonstrate your skills and abilities. Below is a user story that reflects with work you will be doing at Preqin day to day. We would like you to deliver an e2e functional MVP of the feature, try to limit yourself to 2-3hours.

You'll then have the opportunity to showcase your work to some of our engineering team, discuss your solution, explain what you might do differently with more time, and answer any questions.

This exercise is not graded or scored; it is designed to give us a sample of your thought processes as an engineer.

## The User Story

The aim is to fulfill the following user story:

```
As a Preqin user,
I want to see a list of investors, their details and the total of their commitments.
When I click on an investor,
I want to see a breakdown of their commitments.
When I click on an Asset Class
I want to see relevant commitments.
```

Sample data is provided in `data.csv`.

How you visualise the data is up to you, but we include some wireframes just in case you want some guidance:
![Investors Listing](./wireframe-investors.png) ![Commitments Breakdown](./wireframe-investor-commitments.png)

Note: Assume a sole currency of GBP, and ignore any authentication needs.


## Technical Requirements

The solution is completely open but some technical specifications need to be met:

1. You must use a real database and model the entities accordingly. We recommend `SQLite` so that you can include the database with your code.

2. Data must be aggregated/calculated on an API service written in Python or C#

3. Your API must be consumed by a web application using React/Typescript

Note, these are the technologies we use day to day.


## Submitting your solution

Please submit your solution by sharing a public github or bitbucket with your code with the recruiter.
We ask you do not fork or PR against the Preqin repository.

Thank you and good luck!


## Notes for me

Set up db - python database.py from flask-server directory
Start python server with python3 server.py from flask server directory
Start react server with npm start from client directory
