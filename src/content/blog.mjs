export const posts = [
  {
    title: 'Is AI Really Helping Us?',
    slug: 'is-ai-really-helping-us',
    date: '2026-09-30',
    readTime: '15 min read',
    featured: true,
    excerpt:
      'Most of the software on this site was built with AI coding tools. This is what that has taught me about where AI helps, where it quietly hurts, and why I give it four parts of the work in ten and keep the six that decide.',
    intro:
      'I have been asked whether the machine that this age calls AI is truly helping people. Some say it will do everything for us. Some say it will ruin the minds of the young. I have thought about this for some time, and I set down here what I have come to understand, as one who has spent his whole year on a single craft. Read it slowly, and test each part against your own work.',
    image: {
      src: '/images/blog/hotei-watching-a-cockfight.jpg',
      alt: 'Ink painting of Hotei, a stooped figure in a dark robe leaning on a staff, watching two small birds fight at his feet',
      width: 1024,
      height: 1137,
      caption:
        'Hotei Watching a Cockfight, ink on paper, by Miyamoto Musashi. The fight below is small and fierce. The one who stands over it is calm, and sees all of it.',
      credit: {
        label: 'Public domain, via Wikimedia Commons',
        href: 'https://commons.wikimedia.org/wiki/File:Hotei_Watching_a_Cockfight.jpg',
      },
      cardFocus: '30%',
    },
    sections: [
      {
        heading: 'Where I stand',
        paragraphs: [
          'Before I answer, I should say where I am standing. I build software for drones and AI agents, and I am a co-founder of PAWAAC Drones. Most of the software on this site was built with AI coding tools: Claude Code, Kiro CLI and Codex CLI. So I am not writing as someone who fears AI, and I am not writing as someone selling it. I use it every day, and I have seen both what it does well and what it slowly does to the person using it.',
          'People sometimes ask how much of that software the tools did. The honest answer is: most of the typing, and much less of the work. Typing was never the hard part. The hard part is knowing what to build, deciding how the pieces fit, finding out whether it actually works, and standing behind it when it does not.',
          'So here is my answer, up front. AI helps when it is the helper. It hurts when it becomes the owner. In my own work, the best result in the least time comes when AI does about four parts of the work in ten and I keep the other six, and those six must be the ones that decide. The rest of this article is how I arrived at that, and how you can test it against your own work.',
        ],
      },
      {
        heading: 'The question is about the hand',
        paragraphs: [
          'Those who praise AI and those who fear it usually make the same mistake. They look at what the tool can do and argue about whether that is good or bad. A tool is neither. The same tool in two different hands gives two different results. The real question is always who is holding it, and for what.',
          'This was true long before AI. Give two engineers the same laptop, the same software and the same deadline, and their work will be nothing alike. The difference is never the laptop. It is what each of them understands, what each has practised, and whether each knows why the work is being done at all.',
          'Musashi complained that in his time the martial arts had been turned into something to sell, all display and little substance:',
          {
            quote:
              'This mentality divides the flower and fruit into two, and makes much less of the fruit than the flower.',
            cite: 'Miyamoto Musashi',
          },
          'AI makes flowers very easily. A page of writing, a design, a working program appears in the time it takes to make tea, and it looks finished. Whether there is any fruit behind it is a separate question: whether it is correct, whether it fits the people it is for, whether it will hold up on a bad day. That question is answered by the person using the tool, or it is not answered at all.',
        ],
      },
      {
        heading: 'What AI is actually like',
        paragraphs: [
          'The best way I have found to describe AI is to imagine a new member of the team.',
          'Suppose someone joins us who has read every textbook on flight control, the documentation of every autopilot, and every research paper and forum thread on drones ever written. Ask him anything and he answers at once. He writes a first draft of whatever you ask for in seconds. He never gets tired, never sulks, and will work with you at two in the morning without complaint.',
          'But he has never stood in a field at six in the morning with a drone that will not hold its position in a gusting wind. He has never had to tell a customer that a flight is cancelled, or explain to the team why a test failed. He does not know our airframes, our customers, the site we fly at tomorrow, or the mistake we made last month. If the drone comes down, his name is not on the report. And he says what he knows and what he is only guessing in exactly the same confident tone, because to him there is no difference between the two.',
          'That is AI. Everything it knows, it knows from what other people wrote down. It has read more than any of us could read in a hundred lifetimes, and it has lived none of it.',
          'Musashi compared the bow with the gun:',
          {
            quote:
              'One of the virtues of the bow is that the released arrow can be watched by the eye. The rifle bullet cannot be watched, and this is a weak point.',
            cite: 'Miyamoto Musashi',
          },
          'AI’s answers are like the bullet. You see where they land. You do not see how they got there, and the tool cannot truly show you. When you cannot watch the flight, you have to inspect the landing twice as carefully.',
        ],
      },
      {
        heading: 'What a helper like that is good for',
        paragraphs: [
          'A leader who had a team member like this and refused to use him out of pride would be foolish. He is enormously useful, and I use him every day.',
          'He can remind me of things I have forgotten. He can tell me how other people have solved a problem, so that I do not start from nothing. He can write the first version of something I have already decided, so that I can cut it down and reshape it. He can do the same kind of task a hundred times without getting bored. He can read a large, unfamiliar codebase and tell me where things are. He can show me three ways of doing something, so that I can choose. All of this is work that must be done, and all of it takes time I would rather spend on the parts that decide.',
          'A person who uses AI for these things gains many hours and loses nothing.',
        ],
      },
      {
        heading: 'Why it cannot own the work',
        paragraphs: [
          'But I would never send this new team member alone to the field for a customer’s first flight.',
          'Not because he is weak. In a written test he might beat all of us. I would not send him because real work is not a written test. It is one particular job, for one particular customer, on one particular day, under one particular sky, and everything that matters is in those particulars. He knows the general case perfectly and the particular case not at all. And when the day is over, it is my team and I who live with the result, not him.',
          'Every serious piece of work is like this. It is for a particular purpose, for particular people, under particular conditions, and someone must answer for it afterwards. That someone is the owner. The owner is not the person who did the most typing. The owner is the one who knows why every part is the way it is, who can find what went wrong because he knows where each piece was put, and who carries the result when the work meets the world.',
          'The most important thing I have learned as a co-founder is that you can hand over work, but you cannot hand over responsibility. When a drone falls, nobody asks which tool wrote the code. They ask who signed off on it.',
          'AI cannot be the owner, because it does not know the particulars and it carries nothing. It can only be a helper. A helper can be excellent. But the moment you let the helper decide, you have sent the new member of the team to the field alone.',
          'Musashi taught that in a fight you should treat everything around you, even your opponents, as your own forces, and move them as you intend:',
          {
            quote:
              'When you think in these terms, you become the general and your opponents become your soldiers.',
            cite: 'Miyamoto Musashi',
          },
          'With AI, this turns around without your noticing. You ask it something and do what it says. You ask the next thing it suggests, and do that too. A few weeks later you are no longer directing the tool; it is directing you. It has become the general, and you are its soldier. I watch myself for this more than for anything else.',
          'Among the rules Musashi kept for his own life was this one:',
          { quote: 'Respect the gods and Buddhas, but do not depend on them.', cite: 'Miyamoto Musashi' },
          'I hold AI the same way. Respect what it can do. Do not come to depend on it, because a person who depends on something he does not understand has nothing to stand on the day it fails him.',
        ],
      },
      {
        heading: 'What is lost when AI does the hard part',
        paragraphs: [
          { quote: 'A sword feels heavy and difficult to wield for anyone at first.', cite: 'Miyamoto Musashi' },
          'It becomes light in only one way: by being lifted, many times, by you. Nobody can lift it for you, and watching someone else lift it does not put strength in your arm. Every skill I have, I got by doing the work badly first, then less badly, many times over.',
          'When we cut power to a motor mid-flight at Inter IIT Tech Meet 13.0, I was nervous. But I knew why the controller should hold, because we had spent months tuning it. It held. No tool can give you that kind of knowing. You earn it, one hard hour at a time.',
          'The person who gives all his work to AI notices no loss at first. The work is done, and it looks good. But the parts of the craft he no longer practises grow weak in him. After a year he finds he cannot tell good work from bad, because he has not done enough of either with his own hands to feel the difference. So he asks the AI whether the AI’s work is good. He has handed over not only the doing but the judging, and he did not notice when it happened.',
          'This is my answer to those who say AI will ruin the minds of the young. It will not, by itself. What ruins a young engineer is skipping the part of the work that would have taught him, and AI makes that part very easy to skip. So the discipline has to come from the person.',
          'Musashi put it this way:',
          {
            quote:
              'See to it that you temper yourself with one thousand days of practice, and refine yourself with ten thousand days of training.',
            cite: 'Miyamoto Musashi',
          },
          'There is no shortcut in that sentence, and AI has not added one. It can take away the errands. It cannot do the thousand days for you.',
          'There is also the matter of your name. If you put your name on work you did not examine, and it fails, what will you say? That the AI made it? Then it was never your work, and your name did not belong on it. Whatever else you give up, keep the right to say of your work: this is mine, and I know why it is so.',
        ],
      },
      {
        heading: 'The reckoning of forty and sixty',
        paragraphs: [
          'I have said AI should help but not own. Now I want to show how much it should help, with numbers, using an example from my own work.',
          'Suppose I am planning a day of test flights: ten flights, and planning all of them myself takes ten hours. For each flight I have to decide what it is testing, which battery and payload it carries, how high it goes, the wind speed at which we stop, and where the safety pilot stands. I can hand some of the flights to AI. It plans any one of them almost instantly, so its time can be counted as nothing.',
          'But I cannot simply accept its plan. A flight is only right if it fits the flights around it. The battery it needs must have finished charging. What it tests should depend on what the flight before it proved. It has to finish before the light goes or the field permission ends. To judge one of AI’s flights, I have to know the flights on either side of it. If I planned those myself, I can see at a glance whether its flight fits. If I did not, I have to work them out too before I can judge. So the more flights I hand over, the more each one costs to check, because less of the day is already in my head.',
          'Now some numbers. Say that checking one of AI’s flights costs an eighth of an hour for every flight I handed over. Then if I hand over all ten, checking the whole day costs twelve and a half hours, a little more than planning it myself. That is fair, and anyone who has had to sign off on a plan written by someone else knows it. To put your name on a flight you did not plan, you have to understand it as well as whoever planned it, and then also find what they missed. The reckoning is:',
          {
            list: [
              'Hand over nothing. I plan for ten hours. Ten hours in all.',
              'Hand over two flights. I plan for eight hours, and checking the two costs a quarter of an hour each. Eight and a half hours.',
              'Hand over four flights. I plan for six hours, and checking the four costs half an hour each. Eight hours, the least of all.',
              'Hand over six flights. I plan for four hours, and checking the six costs three quarters of an hour each. Eight and a half hours, and now more of the day is AI’s plan than mine.',
              'Hand over all ten. I plan nothing, and checking costs an hour and a quarter for each flight. Twelve and a half hours: longer than doing it myself, and I still do not know the day as well as if I had planned it.',
            ],
          },
          'Two flights and six flights cost the same. With too little help, I waste the tool. With too much, I drown in checking its work. The least time comes at four parts given and six kept.',
          { quote: 'Going too far is the same as not going far enough.', cite: 'Miyamoto Musashi' },
          'You may say I chose the eighth of an hour, and that a different number would give a different answer. That is true. If checking is quicker in your work, the best share moves toward five; if it is slower, toward three. But one thing does not move. Checking complete work you did not make cannot cost less than making it, because you have to understand it as well as its maker before you can even begin to look for mistakes. As long as that holds, the best share for AI in this reckoning is never more than half, whatever number you pick. The owner always keeps the larger part, and the only reason is that understanding is not free.',
          'Time is not the only thing this decides. At four given and six kept, the flights I planned surround the ones AI planned, and the whole day is still in my head. When the wind picks up at noon, I know which flights to move and which to cancel. At six given and four kept, most of the day is a stranger to me. Past half, the plan is AI’s, whatever name is written on it. So forty and sixty is not only the quickest division. It is the one where the work is best and still mine. Try it against your own work and see whether it holds.',
        ],
      },
      {
        heading: 'Which forty and which sixty',
        paragraphs: [
          'It is not enough to hand over four parts. They have to be the right four. If you give AI the decisions and keep the errands for yourself, you have split the work in the right proportion and still ruined it.',
          'Give AI the work that suits a helper:',
          {
            list: [
              'Collecting what is already known and written in many places.',
              'First drafts, which you will then cut down and reshape.',
              'Work that repeats, where the tenth piece is the same as the first.',
              'Arranging and tidying what has already been decided.',
              'Showing you several versions of something, so that you can choose.',
              'Finding details you would otherwise have to look up.',
            ],
          },
          'Keep for yourself the work that belongs to the owner:',
          {
            list: [
              'Deciding what the work is for, and for whom.',
              'Knowing the particulars: the people, the conditions, and what has gone wrong before.',
              'Choosing among what AI has offered, and throwing most of it away.',
              'Deciding how the parts fit together.',
              'Testing the work against the real world, not against AI’s description of it.',
              'Answering for the result.',
            ],
          },
          'How much of a job is gathering and how much is deciding changes from one kind of work to another. The code that keeps a drone in the air needs a far larger share of my own judgment than the code for a landing page, because a mistake in one falls out of the sky and a mistake in the other is only embarrassing. Know your own work well enough to see where its deciding parts are. But in every kind of work, the owner keeps the larger share, and keeps the parts that decide.',
        ],
      },
      {
        heading: 'When to take the wheel back',
        paragraphs: [
          'Some sessions with AI go well and some do not, and it is worth learning to feel the difference early.',
          'There is a good rhythm, where the tool clears away the errands so that my mind is free for the parts that decide. And there is a bad rhythm, where I ask, it answers, I ask again, it answers again, and an afternoon goes by while I believe I am working. I have had both kinds of afternoon, and I have learned to notice which one I am in.',
          'AI has a rhythm of its own as well. It answers at once, every time, with the same calm certainty whether it is right or wrong. If you fall into that rhythm, you start deciding at once too, without weighing anything. Keep your own pace: quick where the matter is simple, slow where it is not.',
          { quote: 'Using the same tactic twice is unavoidable, but you should not use it three times.', cite: 'Miyamoto Musashi' },
          'This holds with AI. If I have asked for something twice and it has not come out right, I do not ask a third time in the same way. The third answer is usually the first answer in different clothes. I change my approach, or I put the tool aside and do that part myself. Often that takes less time than the asking did.',
        ],
      },
      {
        heading: 'The rules I work by',
        paragraphs: [
          'These are the rules I hold myself to, and the ones I ask of anyone who builds with me:',
          {
            list: [
              'Never put your name on something you have not examined.',
              'Ask AI for material, not for decisions.',
              'Decide what done looks like before you ask for anything.',
              'Read what it gives you the way you would read work from a stranger: politely, and with doubt.',
              'Ask it where it might be wrong, and check those places yourself.',
              'Do the hard part yourself, especially when you could hand it over.',
              'Keep some of each day’s work entirely your own, so the skill stays.',
              'When it fails twice, stop asking and do it yourself.',
              'Test against the real thing: the drone, the user, the field. Not against the tool’s summary of it.',
              'Never hand over the decision about what the work is for.',
              'Answer for everything that carries your name.',
            ],
          },
          'Keep these, and AI will make you faster without making you weaker. That is the only kind of help worth having.',
        ],
      },
      {
        heading: 'So, is it helping?',
        paragraphs: [
          'Back to the question I was asked: is AI truly helping people?',
          'It is helping those who use it as a helper. They finish sooner, their work is better, and they grow stronger at what they do, because the tool takes the errands and leaves them the parts that teach. For them it is the best helper there has ever been.',
          'It is not helping those who have made it the owner. They also finish sooner, at first, so they believe they are being helped. But the work is no longer theirs, their judgment weakens without their noticing, and on the day the tool cannot carry them, they find they cannot carry themselves. For them it is a slow injury that feels like help.',
          'The tool is the same in both cases. The difference is the person holding it. Let it do four parts in ten. Do the other six yourself, and make sure they are the six that decide. Then the work is done in the least time, it is as good as it can be, and it is yours.',
          'The helper brings speed.',
          'The owner brings judgment.',
          'The work needs both, and belongs to one.',
        ],
      },
    ],
    note: 'P.S. This article is inspired by The Book of Five Rings by Miyamoto Musashi. The quoted passages are from William Scott Wilson’s translation.',
  },
  {
    title: 'What a True Leader Should Be',
    slug: 'what-a-true-leader-should-be',
    date: '2026-01-18',
    readTime: '8 min read',
    featured: true,
    excerpt:
      'A title does not make anyone a leader. What leading a student club, working on a competition team and co-founding a drone company have taught me about the kind of leader people actually choose to follow.',
    intro:
      'For a long time I thought a leader was the person with the title: the captain, the secretary, the founder. I have now held two of those titles, and I have learned that the title is the smallest part of it. People do not follow a title. They follow a person they trust, and that trust is earned slowly, in small things, mostly when nobody is watching. This is what I believe a true leader should be, and what I am still working to become.',
    image: {
      src: '/images/blog/endurance-under-full-sail.jpg',
      alt: 'Early colour photograph of a wooden sailing ship seen from the front with all its sails set, its hull half hidden behind heaped white pack ice under a pale blue sky',
      width: 1024,
      height: 1280,
      caption:
        'The Endurance under sail in the pack ice of the Weddell Sea, Antarctica, 1915, photographed by Frank Hurley. The ice later crushed the ship, and the expedition never reached its goal. Ernest Shackleton brought every one of its men home.',
      credit: {
        label: 'Public domain, via Wikimedia Commons',
        href: 'https://commons.wikimedia.org/wiki/File:Endurance_under_full_sail_Frank_Hurley_State_Library_NSW_a090012h.jpg',
      },
      cardFocus: '40%',
    },
    sections: [
      {
        heading: 'The title changes nothing',
        paragraphs: [
          'When I became secretary of the Aero Modelling Club at IIT (BHU), twenty to thirty people were counting on me for drone builds, workshops, simulation sessions and technical events. The title did not make any of them work harder. What slowly changed things was what I did: whether I turned up, whether I knew the work, whether I kept my word, and how I behaved when something broke.',
          'The Leader in You draws a clear line between managing and leading. Managing keeps the machine running. Leading is about people: giving them a direction worth working towards, encouraging and coaching them, and building real relationships with them. None of that needs a title. A first-year student who stays late to help a friend fix a flight controller is leading. A founder who only hands out tasks is not.',
          'Dale Carnegie wrote a line that every engineer should read twice:',
          {
            quote:
              'These investigations revealed that even in such technical lines as engineering, about 15 percent of one’s financial success is due to one’s technical knowledge and about 85 percent is due to skill in human engineering—to personality and the ability to lead people.',
            cite: 'Dale Carnegie',
          },
          'I cannot say whether those exact numbers still hold, and for years I would have argued with them. I thought technical skill was everything. But every team I have been part of has taught me the same lesson. The hard part is rarely the controller. It is the people building it: whether they trust each other, whether they speak up, and whether they want the thing to succeed.',
        ],
      },
      {
        heading: 'Go first',
        paragraphs: [
          'The first thing a true leader should be is the one who goes first. First to arrive, first to take the hard and boring part of the work, and first to admit they got something wrong.',
          'I cannot ask anyone to read flight logs line by line if I only skim them. I cannot ask the team to stay for one more test if I am the first to leave. People do not follow what you say about standards. They watch what you do, and they copy it.',
          {
            quote:
              'Setting the example is very important. You can’t expect from others what you’re not willing to expect from yourself.',
            cite: 'Fred Sievert, quoted in The Leader in You',
          },
          'This is where hard work comes in. A leader does not have to be the most talented person in the room, and in most rooms I am not. But a leader should never be the one who worked the least. Talent is given. Effort is chosen, and people always notice what you choose.',
        ],
      },
      {
        heading: 'Listen more than you talk',
        paragraphs: [
          'The second thing I had to learn was to be quiet. As a young engineer, I thought my job in a discussion was to have the best idea, quickly. As a leader, I learned that my job is to make sure the best idea in the room gets said, and it is often not mine.',
          {
            quote:
              'You have to be able to turn off your transmitter and listen—put the receiver on, let other people articulate ideas, and nurture them.',
            cite: 'Richard C. Buetow, quoted in The Leader in You',
          },
          'I work with radios every day, so that line stays with me. Most radios cannot transmit and receive on the same channel at the same moment, and neither can a person. If I am busy preparing my reply, I miss what the person in front of me is actually saying: that the instructions are unclear, that they are afraid of breaking an expensive part, or that they have a better idea and are not sure they are allowed to say it.',
          'Listening is also the cheapest way to show respect. It costs nothing but attention, and people remember it for years.',
        ],
      },
      {
        heading: 'Take the blame, give the credit',
        paragraphs: [
          {
            quote:
              'Don’t point the finger at others. Never raise public complaints about the “weak link” in the chain. Step forward and accept whatever complaints arrive.',
            cite: 'The Leader in You',
          },
          'This is the rule I find hardest, and the one I believe in most. When something fails in front of people who matter, the natural reaction is to explain whose part broke. A leader should do the opposite. In public, the failure is mine. In private, we find out what happened, fix it, and move on without making anyone feel small.',
          'When things go well, the order reverses. The credit goes to the people who did the work, by name. At Inter IIT Tech Meet 13.0, our fault-tolerant controller recovered a quadrotor from a motor failure, and we finished in the national top ten. That result belongs to a team, not to any one of us, and I would not want to tell it any other way.',
        ],
      },
      {
        heading: 'Admit mistakes quickly, criticise slowly',
        paragraphs: [
          'Engineers are trained to find faults in systems. We are much worse at admitting faults in ourselves. But a team copies its leader here as well. If I hide my mistakes, everyone learns to hide theirs, and hidden mistakes are the ones that bring drones down.',
          {
            quote:
              'If an organization is able to admit mistakes, it’s encouraging creativity and encouraging people to take risks.',
            cite: 'Andres Navarro, quoted in The Leader in You',
          },
          'In a startup, taking risks is most of the job. So I try to be the first to say “I got this wrong”, clearly and early, without a long explanation. It is uncomfortable for about a minute. After that it becomes normal for everyone, and the team learns faster than any rulebook could teach it.',
          'When someone else makes the mistake, I try to be slow to criticise. Most mistakes are not a person being careless. They come from a system that made the mistake easy: an unclear checklist, a missing test, a deadline that was never realistic. Fix that, and the same mistake does not come back with the next person. And when I do have to point out a problem, I try to do it privately, in a way that leaves the other person their dignity.',
        ],
      },
      {
        heading: 'See the person, not just the task',
        paragraphs: [
          'As a founder, it is easy to start seeing people as capacity: who can take this task, who is free this week. A true leader should see the person first. What is this person trying to learn? What are they worried about? What would make this week a good one for them?',
          {
            quote: 'Take care of your people, and the business takes care of itself.',
            cite: 'Bill Geppert, quoted in The Leader in You',
          },
          'I have also learned that you cannot order someone to care. You can order them to do a task, and they will do exactly that task and nothing more. The extra hour, the extra check, the idea nobody asked for: those come only when a person wants the work to succeed. My job is to make the work worth wanting. That means a clear purpose, a real share of the responsibility, and honest, specific thanks when something is done well.',
        ],
      },
      {
        heading: 'Stay steady when the plan fails',
        paragraphs: [
          'Drones fail. Demos fail. Customers change their minds a week before a deadline. The team watches the leader more closely in those moments than at any other time. If I panic, they panic. If I stay steady and ask, “What do we know, and what do we do next?”, they start working instead of worrying.',
          'The Leader in You describes a simple way of handling a real worry, and I now use it before every hard test. Work out the worst that could realistically happen. Accept it in your mind. Then spend all your energy making the outcome better than that. Once you have accepted the worst, there is nothing left to fear, only work left to do.',
          'The photograph at the top of this page was taken in 1915, on Ernest Shackleton’s expedition to Antarctica. The ice trapped the ship and later crushed it, and the goal of the expedition was gone. Shackleton gave himself a new goal: bring every man home. It took months on the drifting ice, a voyage in small open boats, and a rescue that did not come until August 1916. Every one of them survived. Nobody remembers that expedition for the crossing it never made. People remember it because of a leader who kept his team together after the plan had failed.',
        ],
      },
      {
        heading: 'Build people who can lead without you',
        paragraphs: [
          'As a core member of the Aero Modelling Club, I taught first-year students drone basics, OpenCV and simulation tools, and helped them through their first builds. Teaching is where I understood that a leader’s real work is to make themselves less necessary. A good build lasts a season. A student who can teach the next batch keeps the club alive long after you have left.',
          {
            quote:
              'The final test of a leader is that he leaves behind him in other men the conviction and the will to carry on.',
            cite: 'Walter Lippmann, quoted in The Leader in You',
          },
          'This matters even more in a company. A founder who has to approve every decision has built a queue, not a team. A true leader should be building people who can make those decisions without them, and then trusting them to make them.',
        ],
      },
      {
        heading: 'Believe in the work, and stay whole',
        paragraphs: [
          'Enthusiasm spreads, and so does the lack of it. If I do not believe in what we are building, nobody on the team will, whatever I say. But enthusiasm is not noise. It is believing in the work so plainly that other people can see it in how you spend your time.',
          'Hard work and balance are not opposites. I work long hours and I am proud of that. But I have learned that a tired leader makes careless decisions and has short-tempered conversations. Sleep, family, friends and time away from the screen are not a break from the job. They are part of doing it well.',
        ],
      },
      {
        heading: 'What I think a true leader should be',
        paragraphs: [
          'Put together, this is the leader I believe people choose to follow, and the one I am trying to be:',
          {
            list: [
              'The first to do the hard work, and the last to take the credit.',
              'A listener before a talker.',
              'Quick to admit their own mistakes, and slow to criticise others.',
              'The one who takes the blame in public and gives the credit by name.',
              'Steady when the plan fails.',
              'Someone who sees the person, not only the task.',
              'Someone who is building people who can lead without them.',
            ],
          },
          'None of this needs a title, a degree or a particular kind of personality. It needs practice, every day, in small things. I do not do all of it well yet. I have written it down so that I can check myself against it, and so that anyone who works with me can hold me to it.',
          'A title tells people who is in charge.',
          'Only the way you lead tells them whether to follow.',
        ],
      },
    ],
    note: 'P.S. This article is inspired by The Leader in You by Dale Carnegie. The quoted passages are from that book.',
  },
]
