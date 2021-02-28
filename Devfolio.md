# Help-More

## [Video Demo](https://youtu.be/sR72k2oUssw)

Doing community work is a great way to give back to others. People across the world are always doing community work such as cleaning parks, helping the elderly in their freetime. However many people are still hesitant to do community work. What if we had a platform where people could create listings for need of such work and people could find these listings and fulfill wishes of the community. Furthermore using blockchain pooling concept we can reward people for their selfless act thereby encouraging more people to do community work.

So we are planning to build a platform where users can add the community work at some required location. Users of the platform will be able to see those tasks. Once any user completes those tasks, they can claim the rewards which they will get in the form of Aave Dai tokens(aDai).

# Flow of Application

Investor -> Philanthropists -> Donate money, claim money back after min of 4 months -> no change

## User

- Dashboard of tasks
  - List a task
    - Add detailed description with location
  - Do a task
    - Need to provide some details of completed task 
    - Claim for reward
- Request rewards
  - Request for reward -> Accept it. Right now fix the amount.




## Tagline 

Help community and earn rewards(crypto money)

## The problem it solves

Doing community work is a great way to give back to others. People across the world are always doing community work such as cleaning parks, helping the elderly in their freetime. However many people are still hesitant to do community work. Also, there are many people who want to help the community by listing tasks, but they do not find a proper platform. Some are not motivated enough to help others/community. Also, we have seen that there are philanthropists who care about community and donate for the welfare of the community, but that donation is not always used in a proper way. 

Help more solve all these issues. It’s a platform where users can add community tasks, perform tasks, and ask for help. To motivate the user, we have a reward system i.e. after completing tasks, users can claim aDai tokens as reward. Philanthropists can donate aDai tokens. After a minimum of 4-5 months, they can claim back all their funds if they want. So you might wonder, how we will get money to reward? Using Aave, we are creating a lending pool where we get cumulative interest every hour. For example, if someone donates 5000 aDai tokens, then after 4-5 months we may have 5500 aDai tokens (interest varies every hour as per blockchain market).

We have three main stakeholders which can do the activities : 

1. User
- List down community/help needed tasks with proper location
- Able to see all tasks in a map with locations
- Perform the community task
- Ask for reward
2. Philanthropist
- Convert Dai to aave Dai(aDai) tokens
- Donate aDai tokens to Help More Organization
- Convert aDai to Dai
- Withdraw the amount back
3. Admin
- Review user’s reward request and accept/decline
- Review withdraw request and accept/decline

IMPACT : By using this platform, it’s a win-win situation for everyone. Users will be able to get motivation to help the society as well as get the money. Philanthropists would be able to withdraw back their funds if they want, but they have already helped the community with their funds. 



## Challenges we ran into 

- Integration of Aave protocol and creating lending pool
- There are two versions of Aave APIs. We started with the latest version, but we were not able to get token addresses of the Kovan test network. When we tried using the address mentioned on Ether scan, it showed some other token instead of Dai. Also we were facing difficulty in finding ABIs. Then we shifted to version 1. In v1 also, we faced a couple of issues in token addresses. But it was solved by tracing addresses on Ether scan. 
- While integrating the lending pool API, we faced some issues. We were not able to create the pool and add money. Initially our approach was to create a contract and use that contract to create LandingPoo. But it did not work. Then we created an address of LendingPoolCore, and using that address we used getLendingPool, and it worked. 
- There were some small issues such as connecting to metamask, gas price value, etc.. which were solved by surfing across the documentation.
- Google Maps API - requires credit card billing to be setup in GCP to receive an API key.
- Radar.io API - No such immediate challenges
- Material UI - No such immediate challenges

