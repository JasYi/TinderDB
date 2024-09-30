# TinderDB

## Inspiration
During our brainstorming sessions on sustainability, our team identified a significant issue: companies generate massive amounts of data daily, leading to waste as older, unused data accumulates. We recognized that this challenge also affects individual developers, who often leave databases untouched as projects stall or evolve over time. Our research revealed that 1 TB of data corresponds to 2 metric tonnes of carbon emissions, which inspired our project, TinderDB. Our goal is to empower users to declutter their databases, ultimately fostering a greener working environment.
## What it does
TinderDB empowers developers to manage their data actively and sustainably. Users first log in and then connect their databases via MongoDB Atlas. Once connected, they’ll see their least active database displayed as a card, complete with statistics on its environmental impact, such as “This database emits 2 tons of carbon/year.” From there, users can choose to delete, retain, or migrate the data to archival storage which is a more sustainable storage option. We guide users through a seamless decluttering process, presenting one database at a time to simplify their cleaning efforts with just a swipe. Additionally, our dashboard tracks their contributions to sustainability, featuring a pie chart that illustrates how their efforts contribute to the community’s overall impact.
## How we built it
On the backend, we used Python and Flask to ship simple APIs that enable our core database manipulation (safe deletion and migration/archival). Our data migration API provides a pipeline for users to smoothly migrate their database to MongoDB Online Archive, with just a swipe. For our consumer-facing web application, we used Next.JS and Tailwind for UI, and Clerk for authentication. 
## Challenges we ran into
We faced a challenge with MongoDB’s robust security measures, which are great for user protection but complicated our development process. Authenticating our team members for app testing proved difficult due to MongoDB's IP address connection restrictions. Additionally, because everyone had a different role, we had difficulties connecting all of the components together into a complete project.  
## Accomplishments that we're proud of
We’re proud of our team’s smooth and efficient collaboration.  By dividing into two groups—one focused on the frontend and the other on the backend—we were able to work in tandem effectively. As a result, we were able to build out a full stack web application with a seamless user interface and a neat backend integration.
## What we learned
This was everyone's first time working deeply with MongoDB. While this povided numerous challenges, we learned how to navigate the complex layers to MongoDB's security to integrate it into an application.  

## What's next for TinderDB
In the next update for TinderDB, we aim to enhance user experience by allowing individuals to view their personal contributions to the overall reduction in carbon emissions from all users, showcasing their impact on building a greener environment. We also plan to integrate an AI component that provides comprehensive summaries of users’ projects, helping them recall the context for which their databases were created. Additionally, we will introduce a history page that enables users to track the databases they’ve removed, fostering a sense of accomplishment and awareness of their sustainability efforts.

Outside of just databases, there are many other areas of compute that developers and enterprises may overlook. We see TinderDB being a tool for not only databases, but a universal tool to make any form of computation more sustainable, whether it's training an ML model or deploying an web app to production. 
