#### 1/25/2019: I've had to stop development of this project due to work constraints. It is a bonafide beast, and will surely turn a profit if we get it to production. If you would like to help develop, please get in touch. It's quite close to the finish line.

<h2 align="center">

<img src="https://i.imgur.com/tvKllna.png" height=100>
<br>
<a href="https://trumpsaid.ai">Trump Said...</a>
</h2>
<h3 align="center">

![Travis (.org) branch](https://img.shields.io/travis/trumpsaid-ai/trumpsaid-ai/master.svg?style=flat-square)
[![](https://img.shields.io/badge/stage-pre--alpha-red.svg?style=flat-square)]()
[![GitHub last commit](https://img.shields.io/github/last-commit/google/skia.svg?style=flat-square)](https://github.com/trumpsaid-ai/trumpsaid-ai)
[![Language grade: JavaScript](https://img.shields.io/lgtm/grade/javascript/g/kazazes/trumpsaid-wtf.svg?logo=lgtm&logoWidth=18&style=flat-square)](https://lgtm.com/projects/g/kazazes/trumpsaid-wtf/alerts)

</h2>

These are historic times, and few chronicle it objectively. There's [Lawfare](https://www.lawfareblog.com), if that's your flavor, or [Drudge](http://drudgereport.com/), or pick-your-poison Reddit, and they're all missing the mark. We don't need opinion factories, we need information factories. We've lost the upside to be drawn from political conflict, and it has become destructive and rapidly deteriorating emotional turmoil.

This is a project about truth in a "post-truth world." We [keep hearing that phrase](https://trends.google.com/trends/explore?date=2016-01-01%202018-08-29&q=post%20truth), and it isn't going away. Primary sources are sobering in the face of exhausting editorialization.

#### "What?"

**Trump Said...** is a rich-media (video, documents and transcript) explorer archiving the _original_, real-life sources of the daily torrent of angry neighbors and news anchors you've been seeing since... _something_ happened to the national psyche around 2015. If that sounds boring and uninspired, just wait and see what some well applied technology can do.

#### "Why?"

Our choice of media outlet has become a defacto litmus test of likeability. We lost ourselves somewhere along the way, and sacrificed self-determination and emotional autonomy with it. We've become a society of outsourced gripes sourced from the talking points of others.

> “Only a virtuous people are capable of freedom. As nations become more corrupt and vicious, they have more need of masters.”

#### We're all at fault, we're all paying the price.

[Wikipedia Current Events](https://en.wikipedia.org/wiki/Portal:Current_events) has been one of the most objective sources of primary source current events material on the internet for fifteen years. Jimmy Wales changed the world then. There's a need for a rich media/artificial inteligence analog. And this is the place to start.

We're almost ready for our first release; [progress can be tracked here](https://github.com/trumpsaid-ai/trumpsaid-ai/projects/2). The dream scenario is to scale the platform to those who cannot freely access or disseminate the information that we as Americans can.

While this may seem hyperbolic, it's fair to say that deep inside of us all there is a fear that we're losing whatever made us exceptional. No one of any political pursuasion wants this environment to endure. This platform will not take sides. It will not selectivly curate content. It won't have to, the content will speak for itself.

## Development

**Dependencies**

- [**docker**](https://docs.docker.com/install/)
- [**yarn**](https://yarnpkg.com/en/docs/install) - Note, there are known issues with installing yarn via npm.

**Build**

1. `git clone git@github.com:trumpsaid-ai/trumpsaid-ai.git && cd trumpsaid-ai`
2. `source .env.example`
3. `yarn install` - **Using yarn is required.** The project requires workspace support.
4. `bin/build-sources.sh`
5. `yarn run webpack`

**Bootstrap database**

1. `docker-compose -f ./packages/prisma/database/docker-compose.yml up -d`
2. `prisma deploy -e .env.example`

**Run**

1. `cd packages/server && yarn debug` _Working on decoupling from GCE for local development. Track progress on [#40](https://github.com/trumpsaid-ai/trumpsaid-ai/issues/40)._
