<h2 align="center">

<img src="https://trumpsaid.wtf/img/trump.svg" height=100>
<br>
<a href="https://trumpsaid.wtf">Trump Said... WTF?</a>

</h2>

## Introduction

These are historic times, and few chronicle it objectively. There's [Lawfare](https://www.lawfareblog.com), if that's your flavor, or [Drudge](http://drudgereport.com/), or pick-your-poison Reddit, and they're all missing the mark. We don't need opinion factories, we need information factories. We've lost the upside to be drawn from political conflict, and it has become destructive and rapidly deteriorating emotional turmoil.

This is a project about truth in a "post-truth world." We [keep hearing that phrase](https://trends.google.com/trends/explore?date=2016-01-01%202018-08-29&q=post%20truth), and it isn't going away. Primary sources are sobering in the face of exhausting editorialization.

#### "What?"

**Trump Said... WTF?** is a rich-media (video, documents and transcript) explorer archiving the _original_, real-life sources of the daily torrent of angry neighbors and news anchors you've been seeing since... _something_ happened to the national psyche around 2015. If that sounds boring and uninspired, just wait what some well applied technology can do.

#### "Why?"

Our choice of media outlet has become a defacto litmus test of likeability. We lost ourselves somewhere along the way, and sacrificed self-determination and emotional autonomy with it. We've become a society of outsourced gripes sourced from the talking points of others.

> “Only a virtuous people are capable of freedom. As nations become more corrupt and vicious, they have more need of masters.”

#### We're all at fault, we're all paying the price.

[Wikipedia Current Events](https://en.wikipedia.org/wiki/Portal:Current_events) has been one of the most objective sources of primary source current events material on the internet for fifteen years. Jimmy Wales changed the world then. There's a need for a rich media/artificial inteligence analog. And this is the place to start.

This platform is well under way, and there is still a ways to go. The roadmap is below. The dream scenario is to scale the platform to those who cannot freely access or disseminate the information that we as Americans can.

While this may seem hyperbolic, it's fair to say that deep inside of us all there is a fear that we're losing whatever _did_ make us exceptional. No one, of any political pursuasion, wants this environment to endure. This platform will not take sides. It will not selectivly curate content. It won't have to, the content will speak for itself.

## Development

<h2 align="center">

[![Total alerts](https://img.shields.io/lgtm/alerts/g/kazazes/trumpsaid-wtf.svg?logo=lgtm&logoWidth=18)](https://lgtm.com/projects/g/kazazes/trumpsaid-wtf/alerts/)
[![Greenkeeper badge](https://badges.greenkeeper.io/kazazes/trumpsaid-wtf.svg)](https://greenkeeper.io/)

</h2>

### Installation

#### Local

- Server dependencies
  - **Prisma** - Prisma provides instant and free [hosted servers](https://www.prisma.io/docs/quickstart/). In production, we host our own.
  - **Redis** - Install and run, or [use docker](https://github.com/bitnami/bitnami-docker-redis/blob/master/4.0/docker-compose.yml).
  - **Google Cloud Engine** - A GCE account. _(TODO: write a setup and teardown script)_

1. Populate `packages/server/.env` with the values in `.env.example`.
2. `yarn install` - Our monorepo structure is dependent on yarn workspaces.
3. `yarn build`
4. `yarn debug`

#### Docker

Run `bin/docker-build.sh` from the project root to build docker images. Provide environment as specified above.
