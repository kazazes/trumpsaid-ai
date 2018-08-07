import { GraphQLResolveInfo, GraphQLSchema } from 'graphql'
import { IResolvers } from 'graphql-tools/dist/Interfaces'
import { Options } from 'graphql-binding'
import { makePrismaBindingClass, BasePrismaOptions } from 'prisma-binding'

export interface Query {
    speakers: <T = Speaker[]>(args: { where?: SpeakerWhereInput, orderBy?: SpeakerOrderByInput, skip?: Int, after?: String, before?: String, first?: Int, last?: Int }, info?: GraphQLResolveInfo | string, options?: Options) => Promise<T> ,
    speechAPIConversations: <T = SpeechAPIConversation[]>(args: { where?: SpeechAPIConversationWhereInput, orderBy?: SpeechAPIConversationOrderByInput, skip?: Int, after?: String, before?: String, first?: Int, last?: Int }, info?: GraphQLResolveInfo | string, options?: Options) => Promise<T> ,
    sources: <T = Source[]>(args: { where?: SourceWhereInput, orderBy?: SourceOrderByInput, skip?: Int, after?: String, before?: String, first?: Int, last?: Int }, info?: GraphQLResolveInfo | string, options?: Options) => Promise<T> ,
    publications: <T = Publication[]>(args: { where?: PublicationWhereInput, orderBy?: PublicationOrderByInput, skip?: Int, after?: String, before?: String, first?: Int, last?: Int }, info?: GraphQLResolveInfo | string, options?: Options) => Promise<T> ,
    dates: <T = Date[]>(args: { where?: DateWhereInput, orderBy?: DateOrderByInput, skip?: Int, after?: String, before?: String, first?: Int, last?: Int }, info?: GraphQLResolveInfo | string, options?: Options) => Promise<T> ,
    thumbnails: <T = Thumbnail[]>(args: { where?: ThumbnailWhereInput, orderBy?: ThumbnailOrderByInput, skip?: Int, after?: String, before?: String, first?: Int, last?: Int }, info?: GraphQLResolveInfo | string, options?: Options) => Promise<T> ,
    users: <T = User[]>(args: { where?: UserWhereInput, orderBy?: UserOrderByInput, skip?: Int, after?: String, before?: String, first?: Int, last?: Int }, info?: GraphQLResolveInfo | string, options?: Options) => Promise<T> ,
    videoMetadatas: <T = VideoMetadata[]>(args: { where?: VideoMetadataWhereInput, orderBy?: VideoMetadataOrderByInput, skip?: Int, after?: String, before?: String, first?: Int, last?: Int }, info?: GraphQLResolveInfo | string, options?: Options) => Promise<T> ,
    speechAPIWords: <T = SpeechAPIWord[]>(args: { where?: SpeechAPIWordWhereInput, orderBy?: SpeechAPIWordOrderByInput, skip?: Int, after?: String, before?: String, first?: Int, last?: Int }, info?: GraphQLResolveInfo | string, options?: Options) => Promise<T> ,
    speechAPIConversationBlocks: <T = SpeechAPIConversationBlock[]>(args: { where?: SpeechAPIConversationBlockWhereInput, orderBy?: SpeechAPIConversationBlockOrderByInput, skip?: Int, after?: String, before?: String, first?: Int, last?: Int }, info?: GraphQLResolveInfo | string, options?: Options) => Promise<T> ,
    videoUploads: <T = VideoUpload[]>(args: { where?: VideoUploadWhereInput, orderBy?: VideoUploadOrderByInput, skip?: Int, after?: String, before?: String, first?: Int, last?: Int }, info?: GraphQLResolveInfo | string, options?: Options) => Promise<T> ,
    tags: <T = Tag[]>(args: { where?: TagWhereInput, orderBy?: TagOrderByInput, skip?: Int, after?: String, before?: String, first?: Int, last?: Int }, info?: GraphQLResolveInfo | string, options?: Options) => Promise<T> ,
    videoStorageLinks: <T = VideoStorageLink[]>(args: { where?: VideoStorageLinkWhereInput, orderBy?: VideoStorageLinkOrderByInput, skip?: Int, after?: String, before?: String, first?: Int, last?: Int }, info?: GraphQLResolveInfo | string, options?: Options) => Promise<T> ,
    videos: <T = Video[]>(args: { where?: VideoWhereInput, orderBy?: VideoOrderByInput, skip?: Int, after?: String, before?: String, first?: Int, last?: Int }, info?: GraphQLResolveInfo | string, options?: Options) => Promise<T> ,
    speaker: <T = Speaker | null>(args: { where: SpeakerWhereUniqueInput }, info?: GraphQLResolveInfo | string, options?: Options) => Promise<T> ,
    speechAPIConversation: <T = SpeechAPIConversation | null>(args: { where: SpeechAPIConversationWhereUniqueInput }, info?: GraphQLResolveInfo | string, options?: Options) => Promise<T> ,
    thumbnail: <T = Thumbnail | null>(args: { where: ThumbnailWhereUniqueInput }, info?: GraphQLResolveInfo | string, options?: Options) => Promise<T> ,
    user: <T = User | null>(args: { where: UserWhereUniqueInput }, info?: GraphQLResolveInfo | string, options?: Options) => Promise<T> ,
    speechAPIWord: <T = SpeechAPIWord | null>(args: { where: SpeechAPIWordWhereUniqueInput }, info?: GraphQLResolveInfo | string, options?: Options) => Promise<T> ,
    speechAPIConversationBlock: <T = SpeechAPIConversationBlock | null>(args: { where: SpeechAPIConversationBlockWhereUniqueInput }, info?: GraphQLResolveInfo | string, options?: Options) => Promise<T> ,
    videoUpload: <T = VideoUpload | null>(args: { where: VideoUploadWhereUniqueInput }, info?: GraphQLResolveInfo | string, options?: Options) => Promise<T> ,
    tag: <T = Tag | null>(args: { where: TagWhereUniqueInput }, info?: GraphQLResolveInfo | string, options?: Options) => Promise<T> ,
    videoStorageLink: <T = VideoStorageLink | null>(args: { where: VideoStorageLinkWhereUniqueInput }, info?: GraphQLResolveInfo | string, options?: Options) => Promise<T> ,
    video: <T = Video | null>(args: { where: VideoWhereUniqueInput }, info?: GraphQLResolveInfo | string, options?: Options) => Promise<T> ,
    speakersConnection: <T = SpeakerConnection>(args: { where?: SpeakerWhereInput, orderBy?: SpeakerOrderByInput, skip?: Int, after?: String, before?: String, first?: Int, last?: Int }, info?: GraphQLResolveInfo | string, options?: Options) => Promise<T> ,
    speechAPIConversationsConnection: <T = SpeechAPIConversationConnection>(args: { where?: SpeechAPIConversationWhereInput, orderBy?: SpeechAPIConversationOrderByInput, skip?: Int, after?: String, before?: String, first?: Int, last?: Int }, info?: GraphQLResolveInfo | string, options?: Options) => Promise<T> ,
    sourcesConnection: <T = SourceConnection>(args: { where?: SourceWhereInput, orderBy?: SourceOrderByInput, skip?: Int, after?: String, before?: String, first?: Int, last?: Int }, info?: GraphQLResolveInfo | string, options?: Options) => Promise<T> ,
    publicationsConnection: <T = PublicationConnection>(args: { where?: PublicationWhereInput, orderBy?: PublicationOrderByInput, skip?: Int, after?: String, before?: String, first?: Int, last?: Int }, info?: GraphQLResolveInfo | string, options?: Options) => Promise<T> ,
    datesConnection: <T = DateConnection>(args: { where?: DateWhereInput, orderBy?: DateOrderByInput, skip?: Int, after?: String, before?: String, first?: Int, last?: Int }, info?: GraphQLResolveInfo | string, options?: Options) => Promise<T> ,
    thumbnailsConnection: <T = ThumbnailConnection>(args: { where?: ThumbnailWhereInput, orderBy?: ThumbnailOrderByInput, skip?: Int, after?: String, before?: String, first?: Int, last?: Int }, info?: GraphQLResolveInfo | string, options?: Options) => Promise<T> ,
    usersConnection: <T = UserConnection>(args: { where?: UserWhereInput, orderBy?: UserOrderByInput, skip?: Int, after?: String, before?: String, first?: Int, last?: Int }, info?: GraphQLResolveInfo | string, options?: Options) => Promise<T> ,
    videoMetadatasConnection: <T = VideoMetadataConnection>(args: { where?: VideoMetadataWhereInput, orderBy?: VideoMetadataOrderByInput, skip?: Int, after?: String, before?: String, first?: Int, last?: Int }, info?: GraphQLResolveInfo | string, options?: Options) => Promise<T> ,
    speechAPIWordsConnection: <T = SpeechAPIWordConnection>(args: { where?: SpeechAPIWordWhereInput, orderBy?: SpeechAPIWordOrderByInput, skip?: Int, after?: String, before?: String, first?: Int, last?: Int }, info?: GraphQLResolveInfo | string, options?: Options) => Promise<T> ,
    speechAPIConversationBlocksConnection: <T = SpeechAPIConversationBlockConnection>(args: { where?: SpeechAPIConversationBlockWhereInput, orderBy?: SpeechAPIConversationBlockOrderByInput, skip?: Int, after?: String, before?: String, first?: Int, last?: Int }, info?: GraphQLResolveInfo | string, options?: Options) => Promise<T> ,
    videoUploadsConnection: <T = VideoUploadConnection>(args: { where?: VideoUploadWhereInput, orderBy?: VideoUploadOrderByInput, skip?: Int, after?: String, before?: String, first?: Int, last?: Int }, info?: GraphQLResolveInfo | string, options?: Options) => Promise<T> ,
    tagsConnection: <T = TagConnection>(args: { where?: TagWhereInput, orderBy?: TagOrderByInput, skip?: Int, after?: String, before?: String, first?: Int, last?: Int }, info?: GraphQLResolveInfo | string, options?: Options) => Promise<T> ,
    videoStorageLinksConnection: <T = VideoStorageLinkConnection>(args: { where?: VideoStorageLinkWhereInput, orderBy?: VideoStorageLinkOrderByInput, skip?: Int, after?: String, before?: String, first?: Int, last?: Int }, info?: GraphQLResolveInfo | string, options?: Options) => Promise<T> ,
    videosConnection: <T = VideoConnection>(args: { where?: VideoWhereInput, orderBy?: VideoOrderByInput, skip?: Int, after?: String, before?: String, first?: Int, last?: Int }, info?: GraphQLResolveInfo | string, options?: Options) => Promise<T> ,
    node: <T = Node | null>(args: { id: ID_Output }, info?: GraphQLResolveInfo | string, options?: Options) => Promise<T> 
  }

export interface Mutation {
    createSpeaker: <T = Speaker>(args: { data: SpeakerCreateInput }, info?: GraphQLResolveInfo | string, options?: Options) => Promise<T> ,
    createSpeechAPIConversation: <T = SpeechAPIConversation>(args: { data: SpeechAPIConversationCreateInput }, info?: GraphQLResolveInfo | string, options?: Options) => Promise<T> ,
    createSource: <T = Source>(args: { data: SourceCreateInput }, info?: GraphQLResolveInfo | string, options?: Options) => Promise<T> ,
    createPublication: <T = Publication>(args: { data: PublicationCreateInput }, info?: GraphQLResolveInfo | string, options?: Options) => Promise<T> ,
    createDate: <T = Date>(args: { data: DateCreateInput }, info?: GraphQLResolveInfo | string, options?: Options) => Promise<T> ,
    createThumbnail: <T = Thumbnail>(args: { data: ThumbnailCreateInput }, info?: GraphQLResolveInfo | string, options?: Options) => Promise<T> ,
    createUser: <T = User>(args: { data: UserCreateInput }, info?: GraphQLResolveInfo | string, options?: Options) => Promise<T> ,
    createVideoMetadata: <T = VideoMetadata>(args: { data: VideoMetadataCreateInput }, info?: GraphQLResolveInfo | string, options?: Options) => Promise<T> ,
    createSpeechAPIWord: <T = SpeechAPIWord>(args: { data: SpeechAPIWordCreateInput }, info?: GraphQLResolveInfo | string, options?: Options) => Promise<T> ,
    createSpeechAPIConversationBlock: <T = SpeechAPIConversationBlock>(args: { data: SpeechAPIConversationBlockCreateInput }, info?: GraphQLResolveInfo | string, options?: Options) => Promise<T> ,
    createVideoUpload: <T = VideoUpload>(args: { data: VideoUploadCreateInput }, info?: GraphQLResolveInfo | string, options?: Options) => Promise<T> ,
    createTag: <T = Tag>(args: { data: TagCreateInput }, info?: GraphQLResolveInfo | string, options?: Options) => Promise<T> ,
    createVideoStorageLink: <T = VideoStorageLink>(args: { data: VideoStorageLinkCreateInput }, info?: GraphQLResolveInfo | string, options?: Options) => Promise<T> ,
    createVideo: <T = Video>(args: { data: VideoCreateInput }, info?: GraphQLResolveInfo | string, options?: Options) => Promise<T> ,
    updateSpeaker: <T = Speaker | null>(args: { data: SpeakerUpdateInput, where: SpeakerWhereUniqueInput }, info?: GraphQLResolveInfo | string, options?: Options) => Promise<T> ,
    updateSpeechAPIConversation: <T = SpeechAPIConversation | null>(args: { data: SpeechAPIConversationUpdateInput, where: SpeechAPIConversationWhereUniqueInput }, info?: GraphQLResolveInfo | string, options?: Options) => Promise<T> ,
    updateThumbnail: <T = Thumbnail | null>(args: { data: ThumbnailUpdateInput, where: ThumbnailWhereUniqueInput }, info?: GraphQLResolveInfo | string, options?: Options) => Promise<T> ,
    updateUser: <T = User | null>(args: { data: UserUpdateInput, where: UserWhereUniqueInput }, info?: GraphQLResolveInfo | string, options?: Options) => Promise<T> ,
    updateSpeechAPIWord: <T = SpeechAPIWord | null>(args: { data: SpeechAPIWordUpdateInput, where: SpeechAPIWordWhereUniqueInput }, info?: GraphQLResolveInfo | string, options?: Options) => Promise<T> ,
    updateSpeechAPIConversationBlock: <T = SpeechAPIConversationBlock | null>(args: { data: SpeechAPIConversationBlockUpdateInput, where: SpeechAPIConversationBlockWhereUniqueInput }, info?: GraphQLResolveInfo | string, options?: Options) => Promise<T> ,
    updateVideoUpload: <T = VideoUpload | null>(args: { data: VideoUploadUpdateInput, where: VideoUploadWhereUniqueInput }, info?: GraphQLResolveInfo | string, options?: Options) => Promise<T> ,
    updateTag: <T = Tag | null>(args: { data: TagUpdateInput, where: TagWhereUniqueInput }, info?: GraphQLResolveInfo | string, options?: Options) => Promise<T> ,
    updateVideoStorageLink: <T = VideoStorageLink | null>(args: { data: VideoStorageLinkUpdateInput, where: VideoStorageLinkWhereUniqueInput }, info?: GraphQLResolveInfo | string, options?: Options) => Promise<T> ,
    updateVideo: <T = Video | null>(args: { data: VideoUpdateInput, where: VideoWhereUniqueInput }, info?: GraphQLResolveInfo | string, options?: Options) => Promise<T> ,
    deleteSpeaker: <T = Speaker | null>(args: { where: SpeakerWhereUniqueInput }, info?: GraphQLResolveInfo | string, options?: Options) => Promise<T> ,
    deleteSpeechAPIConversation: <T = SpeechAPIConversation | null>(args: { where: SpeechAPIConversationWhereUniqueInput }, info?: GraphQLResolveInfo | string, options?: Options) => Promise<T> ,
    deleteThumbnail: <T = Thumbnail | null>(args: { where: ThumbnailWhereUniqueInput }, info?: GraphQLResolveInfo | string, options?: Options) => Promise<T> ,
    deleteUser: <T = User | null>(args: { where: UserWhereUniqueInput }, info?: GraphQLResolveInfo | string, options?: Options) => Promise<T> ,
    deleteSpeechAPIWord: <T = SpeechAPIWord | null>(args: { where: SpeechAPIWordWhereUniqueInput }, info?: GraphQLResolveInfo | string, options?: Options) => Promise<T> ,
    deleteSpeechAPIConversationBlock: <T = SpeechAPIConversationBlock | null>(args: { where: SpeechAPIConversationBlockWhereUniqueInput }, info?: GraphQLResolveInfo | string, options?: Options) => Promise<T> ,
    deleteVideoUpload: <T = VideoUpload | null>(args: { where: VideoUploadWhereUniqueInput }, info?: GraphQLResolveInfo | string, options?: Options) => Promise<T> ,
    deleteTag: <T = Tag | null>(args: { where: TagWhereUniqueInput }, info?: GraphQLResolveInfo | string, options?: Options) => Promise<T> ,
    deleteVideoStorageLink: <T = VideoStorageLink | null>(args: { where: VideoStorageLinkWhereUniqueInput }, info?: GraphQLResolveInfo | string, options?: Options) => Promise<T> ,
    deleteVideo: <T = Video | null>(args: { where: VideoWhereUniqueInput }, info?: GraphQLResolveInfo | string, options?: Options) => Promise<T> ,
    upsertSpeaker: <T = Speaker>(args: { where: SpeakerWhereUniqueInput, create: SpeakerCreateInput, update: SpeakerUpdateInput }, info?: GraphQLResolveInfo | string, options?: Options) => Promise<T> ,
    upsertSpeechAPIConversation: <T = SpeechAPIConversation>(args: { where: SpeechAPIConversationWhereUniqueInput, create: SpeechAPIConversationCreateInput, update: SpeechAPIConversationUpdateInput }, info?: GraphQLResolveInfo | string, options?: Options) => Promise<T> ,
    upsertThumbnail: <T = Thumbnail>(args: { where: ThumbnailWhereUniqueInput, create: ThumbnailCreateInput, update: ThumbnailUpdateInput }, info?: GraphQLResolveInfo | string, options?: Options) => Promise<T> ,
    upsertUser: <T = User>(args: { where: UserWhereUniqueInput, create: UserCreateInput, update: UserUpdateInput }, info?: GraphQLResolveInfo | string, options?: Options) => Promise<T> ,
    upsertSpeechAPIWord: <T = SpeechAPIWord>(args: { where: SpeechAPIWordWhereUniqueInput, create: SpeechAPIWordCreateInput, update: SpeechAPIWordUpdateInput }, info?: GraphQLResolveInfo | string, options?: Options) => Promise<T> ,
    upsertSpeechAPIConversationBlock: <T = SpeechAPIConversationBlock>(args: { where: SpeechAPIConversationBlockWhereUniqueInput, create: SpeechAPIConversationBlockCreateInput, update: SpeechAPIConversationBlockUpdateInput }, info?: GraphQLResolveInfo | string, options?: Options) => Promise<T> ,
    upsertVideoUpload: <T = VideoUpload>(args: { where: VideoUploadWhereUniqueInput, create: VideoUploadCreateInput, update: VideoUploadUpdateInput }, info?: GraphQLResolveInfo | string, options?: Options) => Promise<T> ,
    upsertTag: <T = Tag>(args: { where: TagWhereUniqueInput, create: TagCreateInput, update: TagUpdateInput }, info?: GraphQLResolveInfo | string, options?: Options) => Promise<T> ,
    upsertVideoStorageLink: <T = VideoStorageLink>(args: { where: VideoStorageLinkWhereUniqueInput, create: VideoStorageLinkCreateInput, update: VideoStorageLinkUpdateInput }, info?: GraphQLResolveInfo | string, options?: Options) => Promise<T> ,
    upsertVideo: <T = Video>(args: { where: VideoWhereUniqueInput, create: VideoCreateInput, update: VideoUpdateInput }, info?: GraphQLResolveInfo | string, options?: Options) => Promise<T> ,
    updateManySpeakers: <T = BatchPayload>(args: { data: SpeakerUpdateInput, where?: SpeakerWhereInput }, info?: GraphQLResolveInfo | string, options?: Options) => Promise<T> ,
    updateManySpeechAPIConversations: <T = BatchPayload>(args: { data: SpeechAPIConversationUpdateInput, where?: SpeechAPIConversationWhereInput }, info?: GraphQLResolveInfo | string, options?: Options) => Promise<T> ,
    updateManySources: <T = BatchPayload>(args: { data: SourceUpdateInput, where?: SourceWhereInput }, info?: GraphQLResolveInfo | string, options?: Options) => Promise<T> ,
    updateManyPublications: <T = BatchPayload>(args: { data: PublicationUpdateInput, where?: PublicationWhereInput }, info?: GraphQLResolveInfo | string, options?: Options) => Promise<T> ,
    updateManyDates: <T = BatchPayload>(args: { data: DateUpdateInput, where?: DateWhereInput }, info?: GraphQLResolveInfo | string, options?: Options) => Promise<T> ,
    updateManyThumbnails: <T = BatchPayload>(args: { data: ThumbnailUpdateInput, where?: ThumbnailWhereInput }, info?: GraphQLResolveInfo | string, options?: Options) => Promise<T> ,
    updateManyUsers: <T = BatchPayload>(args: { data: UserUpdateInput, where?: UserWhereInput }, info?: GraphQLResolveInfo | string, options?: Options) => Promise<T> ,
    updateManyVideoMetadatas: <T = BatchPayload>(args: { data: VideoMetadataUpdateInput, where?: VideoMetadataWhereInput }, info?: GraphQLResolveInfo | string, options?: Options) => Promise<T> ,
    updateManySpeechAPIWords: <T = BatchPayload>(args: { data: SpeechAPIWordUpdateInput, where?: SpeechAPIWordWhereInput }, info?: GraphQLResolveInfo | string, options?: Options) => Promise<T> ,
    updateManySpeechAPIConversationBlocks: <T = BatchPayload>(args: { data: SpeechAPIConversationBlockUpdateInput, where?: SpeechAPIConversationBlockWhereInput }, info?: GraphQLResolveInfo | string, options?: Options) => Promise<T> ,
    updateManyVideoUploads: <T = BatchPayload>(args: { data: VideoUploadUpdateInput, where?: VideoUploadWhereInput }, info?: GraphQLResolveInfo | string, options?: Options) => Promise<T> ,
    updateManyTags: <T = BatchPayload>(args: { data: TagUpdateInput, where?: TagWhereInput }, info?: GraphQLResolveInfo | string, options?: Options) => Promise<T> ,
    updateManyVideoStorageLinks: <T = BatchPayload>(args: { data: VideoStorageLinkUpdateInput, where?: VideoStorageLinkWhereInput }, info?: GraphQLResolveInfo | string, options?: Options) => Promise<T> ,
    updateManyVideos: <T = BatchPayload>(args: { data: VideoUpdateInput, where?: VideoWhereInput }, info?: GraphQLResolveInfo | string, options?: Options) => Promise<T> ,
    deleteManySpeakers: <T = BatchPayload>(args: { where?: SpeakerWhereInput }, info?: GraphQLResolveInfo | string, options?: Options) => Promise<T> ,
    deleteManySpeechAPIConversations: <T = BatchPayload>(args: { where?: SpeechAPIConversationWhereInput }, info?: GraphQLResolveInfo | string, options?: Options) => Promise<T> ,
    deleteManySources: <T = BatchPayload>(args: { where?: SourceWhereInput }, info?: GraphQLResolveInfo | string, options?: Options) => Promise<T> ,
    deleteManyPublications: <T = BatchPayload>(args: { where?: PublicationWhereInput }, info?: GraphQLResolveInfo | string, options?: Options) => Promise<T> ,
    deleteManyDates: <T = BatchPayload>(args: { where?: DateWhereInput }, info?: GraphQLResolveInfo | string, options?: Options) => Promise<T> ,
    deleteManyThumbnails: <T = BatchPayload>(args: { where?: ThumbnailWhereInput }, info?: GraphQLResolveInfo | string, options?: Options) => Promise<T> ,
    deleteManyUsers: <T = BatchPayload>(args: { where?: UserWhereInput }, info?: GraphQLResolveInfo | string, options?: Options) => Promise<T> ,
    deleteManyVideoMetadatas: <T = BatchPayload>(args: { where?: VideoMetadataWhereInput }, info?: GraphQLResolveInfo | string, options?: Options) => Promise<T> ,
    deleteManySpeechAPIWords: <T = BatchPayload>(args: { where?: SpeechAPIWordWhereInput }, info?: GraphQLResolveInfo | string, options?: Options) => Promise<T> ,
    deleteManySpeechAPIConversationBlocks: <T = BatchPayload>(args: { where?: SpeechAPIConversationBlockWhereInput }, info?: GraphQLResolveInfo | string, options?: Options) => Promise<T> ,
    deleteManyVideoUploads: <T = BatchPayload>(args: { where?: VideoUploadWhereInput }, info?: GraphQLResolveInfo | string, options?: Options) => Promise<T> ,
    deleteManyTags: <T = BatchPayload>(args: { where?: TagWhereInput }, info?: GraphQLResolveInfo | string, options?: Options) => Promise<T> ,
    deleteManyVideoStorageLinks: <T = BatchPayload>(args: { where?: VideoStorageLinkWhereInput }, info?: GraphQLResolveInfo | string, options?: Options) => Promise<T> ,
    deleteManyVideos: <T = BatchPayload>(args: { where?: VideoWhereInput }, info?: GraphQLResolveInfo | string, options?: Options) => Promise<T> 
  }

export interface Subscription {
    speaker: <T = SpeakerSubscriptionPayload | null>(args: { where?: SpeakerSubscriptionWhereInput }, info?: GraphQLResolveInfo | string, options?: Options) => Promise<AsyncIterator<T>> ,
    speechAPIConversation: <T = SpeechAPIConversationSubscriptionPayload | null>(args: { where?: SpeechAPIConversationSubscriptionWhereInput }, info?: GraphQLResolveInfo | string, options?: Options) => Promise<AsyncIterator<T>> ,
    source: <T = SourceSubscriptionPayload | null>(args: { where?: SourceSubscriptionWhereInput }, info?: GraphQLResolveInfo | string, options?: Options) => Promise<AsyncIterator<T>> ,
    publication: <T = PublicationSubscriptionPayload | null>(args: { where?: PublicationSubscriptionWhereInput }, info?: GraphQLResolveInfo | string, options?: Options) => Promise<AsyncIterator<T>> ,
    date: <T = DateSubscriptionPayload | null>(args: { where?: DateSubscriptionWhereInput }, info?: GraphQLResolveInfo | string, options?: Options) => Promise<AsyncIterator<T>> ,
    thumbnail: <T = ThumbnailSubscriptionPayload | null>(args: { where?: ThumbnailSubscriptionWhereInput }, info?: GraphQLResolveInfo | string, options?: Options) => Promise<AsyncIterator<T>> ,
    user: <T = UserSubscriptionPayload | null>(args: { where?: UserSubscriptionWhereInput }, info?: GraphQLResolveInfo | string, options?: Options) => Promise<AsyncIterator<T>> ,
    videoMetadata: <T = VideoMetadataSubscriptionPayload | null>(args: { where?: VideoMetadataSubscriptionWhereInput }, info?: GraphQLResolveInfo | string, options?: Options) => Promise<AsyncIterator<T>> ,
    speechAPIWord: <T = SpeechAPIWordSubscriptionPayload | null>(args: { where?: SpeechAPIWordSubscriptionWhereInput }, info?: GraphQLResolveInfo | string, options?: Options) => Promise<AsyncIterator<T>> ,
    speechAPIConversationBlock: <T = SpeechAPIConversationBlockSubscriptionPayload | null>(args: { where?: SpeechAPIConversationBlockSubscriptionWhereInput }, info?: GraphQLResolveInfo | string, options?: Options) => Promise<AsyncIterator<T>> ,
    videoUpload: <T = VideoUploadSubscriptionPayload | null>(args: { where?: VideoUploadSubscriptionWhereInput }, info?: GraphQLResolveInfo | string, options?: Options) => Promise<AsyncIterator<T>> ,
    tag: <T = TagSubscriptionPayload | null>(args: { where?: TagSubscriptionWhereInput }, info?: GraphQLResolveInfo | string, options?: Options) => Promise<AsyncIterator<T>> ,
    videoStorageLink: <T = VideoStorageLinkSubscriptionPayload | null>(args: { where?: VideoStorageLinkSubscriptionWhereInput }, info?: GraphQLResolveInfo | string, options?: Options) => Promise<AsyncIterator<T>> ,
    video: <T = VideoSubscriptionPayload | null>(args: { where?: VideoSubscriptionWhereInput }, info?: GraphQLResolveInfo | string, options?: Options) => Promise<AsyncIterator<T>> 
  }

export interface Exists {
  Speaker: (where?: SpeakerWhereInput) => Promise<boolean>
  SpeechAPIConversation: (where?: SpeechAPIConversationWhereInput) => Promise<boolean>
  Source: (where?: SourceWhereInput) => Promise<boolean>
  Publication: (where?: PublicationWhereInput) => Promise<boolean>
  Date: (where?: DateWhereInput) => Promise<boolean>
  Thumbnail: (where?: ThumbnailWhereInput) => Promise<boolean>
  User: (where?: UserWhereInput) => Promise<boolean>
  VideoMetadata: (where?: VideoMetadataWhereInput) => Promise<boolean>
  SpeechAPIWord: (where?: SpeechAPIWordWhereInput) => Promise<boolean>
  SpeechAPIConversationBlock: (where?: SpeechAPIConversationBlockWhereInput) => Promise<boolean>
  VideoUpload: (where?: VideoUploadWhereInput) => Promise<boolean>
  Tag: (where?: TagWhereInput) => Promise<boolean>
  VideoStorageLink: (where?: VideoStorageLinkWhereInput) => Promise<boolean>
  Video: (where?: VideoWhereInput) => Promise<boolean>
}

export interface Prisma {
  query: Query
  mutation: Mutation
  subscription: Subscription
  exists: Exists
  request: <T = any>(query: string, variables?: {[key: string]: any}) => Promise<T>
  delegate(operation: 'query' | 'mutation', fieldName: string, args: {
    [key: string]: any;
}, infoOrQuery?: GraphQLResolveInfo | string, options?: Options): Promise<any>;
delegateSubscription(fieldName: string, args?: {
    [key: string]: any;
}, infoOrQuery?: GraphQLResolveInfo | string, options?: Options): Promise<AsyncIterator<any>>;
getAbstractResolvers(filterSchema?: GraphQLSchema | string): IResolvers;
}

export interface BindingConstructor<T> {
  new(options: BasePrismaOptions): T
}
/**
 * Type Defs
*/

const typeDefs = `enum AdminRole {
  CREATE_UPLOAD
  LIST_UPLOADS
  LIST_ALL_UPLOADS
  ADVANCE_UPLOADS
  PUBLISH_UPLOAD
  DELETE_UPLOADS
}

type AggregateDate {
  count: Int!
}

type AggregatePublication {
  count: Int!
}

type AggregateSource {
  count: Int!
}

type AggregateSpeaker {
  count: Int!
}

type AggregateSpeechAPIConversation {
  count: Int!
}

type AggregateSpeechAPIConversationBlock {
  count: Int!
}

type AggregateSpeechAPIWord {
  count: Int!
}

type AggregateTag {
  count: Int!
}

type AggregateThumbnail {
  count: Int!
}

type AggregateUser {
  count: Int!
}

type AggregateVideo {
  count: Int!
}

type AggregateVideoMetadata {
  count: Int!
}

type AggregateVideoStorageLink {
  count: Int!
}

type AggregateVideoUpload {
  count: Int!
}

type BatchPayload {
  """The number of nodes that have been affected by the Batch operation."""
  count: Long!
}

type Date {
  month: Int!
  day: Int!
  year: Int!
}

"""A connection to a list of items."""
type DateConnection {
  """Information to aid in pagination."""
  pageInfo: PageInfo!

  """A list of edges."""
  edges: [DateEdge]!
  aggregate: AggregateDate!
}

input DateCreateInput {
  month: Int!
  day: Int!
  year: Int!
}

input DateCreateOneInput {
  create: DateCreateInput
}

"""An edge in a connection."""
type DateEdge {
  """The item at the end of the edge."""
  node: Date!

  """A cursor for use in pagination."""
  cursor: String!
}

enum DateOrderByInput {
  month_ASC
  month_DESC
  day_ASC
  day_DESC
  year_ASC
  year_DESC
  id_ASC
  id_DESC
  updatedAt_ASC
  updatedAt_DESC
  createdAt_ASC
  createdAt_DESC
}

type DatePreviousValues {
  month: Int!
  day: Int!
  year: Int!
}

type DateSubscriptionPayload {
  mutation: MutationType!
  node: Date
  updatedFields: [String!]
  previousValues: DatePreviousValues
}

input DateSubscriptionWhereInput {
  """Logical AND on all given filters."""
  AND: [DateSubscriptionWhereInput!]

  """Logical OR on all given filters."""
  OR: [DateSubscriptionWhereInput!]

  """Logical NOT on all given filters combined by AND."""
  NOT: [DateSubscriptionWhereInput!]

  """
  The subscription event gets dispatched when it's listed in mutation_in
  """
  mutation_in: [MutationType!]

  """
  The subscription event gets only dispatched when one of the updated fields names is included in this list
  """
  updatedFields_contains: String

  """
  The subscription event gets only dispatched when all of the field names included in this list have been updated
  """
  updatedFields_contains_every: [String!]

  """
  The subscription event gets only dispatched when some of the field names included in this list have been updated
  """
  updatedFields_contains_some: [String!]
  node: DateWhereInput
}

scalar DateTime

input DateUpdateDataInput {
  month: Int
  day: Int
  year: Int
}

input DateUpdateInput {
  month: Int
  day: Int
  year: Int
}

input DateUpdateOneInput {
  create: DateCreateInput
  disconnect: Boolean
  delete: Boolean
  update: DateUpdateDataInput
  upsert: DateUpsertNestedInput
}

input DateUpsertNestedInput {
  update: DateUpdateDataInput!
  create: DateCreateInput!
}

input DateWhereInput {
  """Logical AND on all given filters."""
  AND: [DateWhereInput!]

  """Logical OR on all given filters."""
  OR: [DateWhereInput!]

  """Logical NOT on all given filters combined by AND."""
  NOT: [DateWhereInput!]
  month: Int

  """All values that are not equal to given value."""
  month_not: Int

  """All values that are contained in given list."""
  month_in: [Int!]

  """All values that are not contained in given list."""
  month_not_in: [Int!]

  """All values less than the given value."""
  month_lt: Int

  """All values less than or equal the given value."""
  month_lte: Int

  """All values greater than the given value."""
  month_gt: Int

  """All values greater than or equal the given value."""
  month_gte: Int
  day: Int

  """All values that are not equal to given value."""
  day_not: Int

  """All values that are contained in given list."""
  day_in: [Int!]

  """All values that are not contained in given list."""
  day_not_in: [Int!]

  """All values less than the given value."""
  day_lt: Int

  """All values less than or equal the given value."""
  day_lte: Int

  """All values greater than the given value."""
  day_gt: Int

  """All values greater than or equal the given value."""
  day_gte: Int
  year: Int

  """All values that are not equal to given value."""
  year_not: Int

  """All values that are contained in given list."""
  year_in: [Int!]

  """All values that are not contained in given list."""
  year_not_in: [Int!]

  """All values less than the given value."""
  year_lt: Int

  """All values less than or equal the given value."""
  year_lte: Int

  """All values greater than the given value."""
  year_gt: Int

  """All values greater than or equal the given value."""
  year_gte: Int
  _MagicalBackRelation_DateToVideoMetadata_every: VideoMetadataWhereInput
  _MagicalBackRelation_DateToVideoMetadata_some: VideoMetadataWhereInput
  _MagicalBackRelation_DateToVideoMetadata_none: VideoMetadataWhereInput
}

"""
The \`Long\` scalar type represents non-fractional signed whole numeric values.
Long can represent values between -(2^63) and 2^63 - 1.
"""
scalar Long

type Mutation {
  createSpeaker(data: SpeakerCreateInput!): Speaker!
  createSpeechAPIConversation(data: SpeechAPIConversationCreateInput!): SpeechAPIConversation!
  createSource(data: SourceCreateInput!): Source!
  createPublication(data: PublicationCreateInput!): Publication!
  createDate(data: DateCreateInput!): Date!
  createThumbnail(data: ThumbnailCreateInput!): Thumbnail!
  createUser(data: UserCreateInput!): User!
  createVideoMetadata(data: VideoMetadataCreateInput!): VideoMetadata!
  createSpeechAPIWord(data: SpeechAPIWordCreateInput!): SpeechAPIWord!
  createSpeechAPIConversationBlock(data: SpeechAPIConversationBlockCreateInput!): SpeechAPIConversationBlock!
  createVideoUpload(data: VideoUploadCreateInput!): VideoUpload!
  createTag(data: TagCreateInput!): Tag!
  createVideoStorageLink(data: VideoStorageLinkCreateInput!): VideoStorageLink!
  createVideo(data: VideoCreateInput!): Video!
  updateSpeaker(data: SpeakerUpdateInput!, where: SpeakerWhereUniqueInput!): Speaker
  updateSpeechAPIConversation(data: SpeechAPIConversationUpdateInput!, where: SpeechAPIConversationWhereUniqueInput!): SpeechAPIConversation
  updateThumbnail(data: ThumbnailUpdateInput!, where: ThumbnailWhereUniqueInput!): Thumbnail
  updateUser(data: UserUpdateInput!, where: UserWhereUniqueInput!): User
  updateSpeechAPIWord(data: SpeechAPIWordUpdateInput!, where: SpeechAPIWordWhereUniqueInput!): SpeechAPIWord
  updateSpeechAPIConversationBlock(data: SpeechAPIConversationBlockUpdateInput!, where: SpeechAPIConversationBlockWhereUniqueInput!): SpeechAPIConversationBlock
  updateVideoUpload(data: VideoUploadUpdateInput!, where: VideoUploadWhereUniqueInput!): VideoUpload
  updateTag(data: TagUpdateInput!, where: TagWhereUniqueInput!): Tag
  updateVideoStorageLink(data: VideoStorageLinkUpdateInput!, where: VideoStorageLinkWhereUniqueInput!): VideoStorageLink
  updateVideo(data: VideoUpdateInput!, where: VideoWhereUniqueInput!): Video
  deleteSpeaker(where: SpeakerWhereUniqueInput!): Speaker
  deleteSpeechAPIConversation(where: SpeechAPIConversationWhereUniqueInput!): SpeechAPIConversation
  deleteThumbnail(where: ThumbnailWhereUniqueInput!): Thumbnail
  deleteUser(where: UserWhereUniqueInput!): User
  deleteSpeechAPIWord(where: SpeechAPIWordWhereUniqueInput!): SpeechAPIWord
  deleteSpeechAPIConversationBlock(where: SpeechAPIConversationBlockWhereUniqueInput!): SpeechAPIConversationBlock
  deleteVideoUpload(where: VideoUploadWhereUniqueInput!): VideoUpload
  deleteTag(where: TagWhereUniqueInput!): Tag
  deleteVideoStorageLink(where: VideoStorageLinkWhereUniqueInput!): VideoStorageLink
  deleteVideo(where: VideoWhereUniqueInput!): Video
  upsertSpeaker(where: SpeakerWhereUniqueInput!, create: SpeakerCreateInput!, update: SpeakerUpdateInput!): Speaker!
  upsertSpeechAPIConversation(where: SpeechAPIConversationWhereUniqueInput!, create: SpeechAPIConversationCreateInput!, update: SpeechAPIConversationUpdateInput!): SpeechAPIConversation!
  upsertThumbnail(where: ThumbnailWhereUniqueInput!, create: ThumbnailCreateInput!, update: ThumbnailUpdateInput!): Thumbnail!
  upsertUser(where: UserWhereUniqueInput!, create: UserCreateInput!, update: UserUpdateInput!): User!
  upsertSpeechAPIWord(where: SpeechAPIWordWhereUniqueInput!, create: SpeechAPIWordCreateInput!, update: SpeechAPIWordUpdateInput!): SpeechAPIWord!
  upsertSpeechAPIConversationBlock(where: SpeechAPIConversationBlockWhereUniqueInput!, create: SpeechAPIConversationBlockCreateInput!, update: SpeechAPIConversationBlockUpdateInput!): SpeechAPIConversationBlock!
  upsertVideoUpload(where: VideoUploadWhereUniqueInput!, create: VideoUploadCreateInput!, update: VideoUploadUpdateInput!): VideoUpload!
  upsertTag(where: TagWhereUniqueInput!, create: TagCreateInput!, update: TagUpdateInput!): Tag!
  upsertVideoStorageLink(where: VideoStorageLinkWhereUniqueInput!, create: VideoStorageLinkCreateInput!, update: VideoStorageLinkUpdateInput!): VideoStorageLink!
  upsertVideo(where: VideoWhereUniqueInput!, create: VideoCreateInput!, update: VideoUpdateInput!): Video!
  updateManySpeakers(data: SpeakerUpdateInput!, where: SpeakerWhereInput): BatchPayload!
  updateManySpeechAPIConversations(data: SpeechAPIConversationUpdateInput!, where: SpeechAPIConversationWhereInput): BatchPayload!
  updateManySources(data: SourceUpdateInput!, where: SourceWhereInput): BatchPayload!
  updateManyPublications(data: PublicationUpdateInput!, where: PublicationWhereInput): BatchPayload!
  updateManyDates(data: DateUpdateInput!, where: DateWhereInput): BatchPayload!
  updateManyThumbnails(data: ThumbnailUpdateInput!, where: ThumbnailWhereInput): BatchPayload!
  updateManyUsers(data: UserUpdateInput!, where: UserWhereInput): BatchPayload!
  updateManyVideoMetadatas(data: VideoMetadataUpdateInput!, where: VideoMetadataWhereInput): BatchPayload!
  updateManySpeechAPIWords(data: SpeechAPIWordUpdateInput!, where: SpeechAPIWordWhereInput): BatchPayload!
  updateManySpeechAPIConversationBlocks(data: SpeechAPIConversationBlockUpdateInput!, where: SpeechAPIConversationBlockWhereInput): BatchPayload!
  updateManyVideoUploads(data: VideoUploadUpdateInput!, where: VideoUploadWhereInput): BatchPayload!
  updateManyTags(data: TagUpdateInput!, where: TagWhereInput): BatchPayload!
  updateManyVideoStorageLinks(data: VideoStorageLinkUpdateInput!, where: VideoStorageLinkWhereInput): BatchPayload!
  updateManyVideos(data: VideoUpdateInput!, where: VideoWhereInput): BatchPayload!
  deleteManySpeakers(where: SpeakerWhereInput): BatchPayload!
  deleteManySpeechAPIConversations(where: SpeechAPIConversationWhereInput): BatchPayload!
  deleteManySources(where: SourceWhereInput): BatchPayload!
  deleteManyPublications(where: PublicationWhereInput): BatchPayload!
  deleteManyDates(where: DateWhereInput): BatchPayload!
  deleteManyThumbnails(where: ThumbnailWhereInput): BatchPayload!
  deleteManyUsers(where: UserWhereInput): BatchPayload!
  deleteManyVideoMetadatas(where: VideoMetadataWhereInput): BatchPayload!
  deleteManySpeechAPIWords(where: SpeechAPIWordWhereInput): BatchPayload!
  deleteManySpeechAPIConversationBlocks(where: SpeechAPIConversationBlockWhereInput): BatchPayload!
  deleteManyVideoUploads(where: VideoUploadWhereInput): BatchPayload!
  deleteManyTags(where: TagWhereInput): BatchPayload!
  deleteManyVideoStorageLinks(where: VideoStorageLinkWhereInput): BatchPayload!
  deleteManyVideos(where: VideoWhereInput): BatchPayload!
}

enum MutationType {
  CREATED
  UPDATED
  DELETED
}

"""An object with an ID"""
interface Node {
  """The id of the object."""
  id: ID!
}

"""Information about pagination in a connection."""
type PageInfo {
  """When paginating forwards, are there more items?"""
  hasNextPage: Boolean!

  """When paginating backwards, are there more items?"""
  hasPreviousPage: Boolean!

  """When paginating backwards, the cursor to continue."""
  startCursor: String

  """When paginating forwards, the cursor to continue."""
  endCursor: String
}

type Publication {
  avatarPath: String!
  name: String!
}

"""A connection to a list of items."""
type PublicationConnection {
  """Information to aid in pagination."""
  pageInfo: PageInfo!

  """A list of edges."""
  edges: [PublicationEdge]!
  aggregate: AggregatePublication!
}

input PublicationCreateInput {
  avatarPath: String!
  name: String!
}

input PublicationCreateOneInput {
  create: PublicationCreateInput
}

"""An edge in a connection."""
type PublicationEdge {
  """The item at the end of the edge."""
  node: Publication!

  """A cursor for use in pagination."""
  cursor: String!
}

enum PublicationOrderByInput {
  avatarPath_ASC
  avatarPath_DESC
  name_ASC
  name_DESC
  id_ASC
  id_DESC
  updatedAt_ASC
  updatedAt_DESC
  createdAt_ASC
  createdAt_DESC
}

type PublicationPreviousValues {
  avatarPath: String!
  name: String!
}

type PublicationSubscriptionPayload {
  mutation: MutationType!
  node: Publication
  updatedFields: [String!]
  previousValues: PublicationPreviousValues
}

input PublicationSubscriptionWhereInput {
  """Logical AND on all given filters."""
  AND: [PublicationSubscriptionWhereInput!]

  """Logical OR on all given filters."""
  OR: [PublicationSubscriptionWhereInput!]

  """Logical NOT on all given filters combined by AND."""
  NOT: [PublicationSubscriptionWhereInput!]

  """
  The subscription event gets dispatched when it's listed in mutation_in
  """
  mutation_in: [MutationType!]

  """
  The subscription event gets only dispatched when one of the updated fields names is included in this list
  """
  updatedFields_contains: String

  """
  The subscription event gets only dispatched when all of the field names included in this list have been updated
  """
  updatedFields_contains_every: [String!]

  """
  The subscription event gets only dispatched when some of the field names included in this list have been updated
  """
  updatedFields_contains_some: [String!]
  node: PublicationWhereInput
}

input PublicationUpdateDataInput {
  avatarPath: String
  name: String
}

input PublicationUpdateInput {
  avatarPath: String
  name: String
}

input PublicationUpdateOneInput {
  create: PublicationCreateInput
  delete: Boolean
  update: PublicationUpdateDataInput
  upsert: PublicationUpsertNestedInput
}

input PublicationUpsertNestedInput {
  update: PublicationUpdateDataInput!
  create: PublicationCreateInput!
}

input PublicationWhereInput {
  """Logical AND on all given filters."""
  AND: [PublicationWhereInput!]

  """Logical OR on all given filters."""
  OR: [PublicationWhereInput!]

  """Logical NOT on all given filters combined by AND."""
  NOT: [PublicationWhereInput!]
  avatarPath: String

  """All values that are not equal to given value."""
  avatarPath_not: String

  """All values that are contained in given list."""
  avatarPath_in: [String!]

  """All values that are not contained in given list."""
  avatarPath_not_in: [String!]

  """All values less than the given value."""
  avatarPath_lt: String

  """All values less than or equal the given value."""
  avatarPath_lte: String

  """All values greater than the given value."""
  avatarPath_gt: String

  """All values greater than or equal the given value."""
  avatarPath_gte: String

  """All values containing the given string."""
  avatarPath_contains: String

  """All values not containing the given string."""
  avatarPath_not_contains: String

  """All values starting with the given string."""
  avatarPath_starts_with: String

  """All values not starting with the given string."""
  avatarPath_not_starts_with: String

  """All values ending with the given string."""
  avatarPath_ends_with: String

  """All values not ending with the given string."""
  avatarPath_not_ends_with: String
  name: String

  """All values that are not equal to given value."""
  name_not: String

  """All values that are contained in given list."""
  name_in: [String!]

  """All values that are not contained in given list."""
  name_not_in: [String!]

  """All values less than the given value."""
  name_lt: String

  """All values less than or equal the given value."""
  name_lte: String

  """All values greater than the given value."""
  name_gt: String

  """All values greater than or equal the given value."""
  name_gte: String

  """All values containing the given string."""
  name_contains: String

  """All values not containing the given string."""
  name_not_contains: String

  """All values starting with the given string."""
  name_starts_with: String

  """All values not starting with the given string."""
  name_not_starts_with: String

  """All values ending with the given string."""
  name_ends_with: String

  """All values not ending with the given string."""
  name_not_ends_with: String
  _MagicalBackRelation_PublicationToSource_every: SourceWhereInput
  _MagicalBackRelation_PublicationToSource_some: SourceWhereInput
  _MagicalBackRelation_PublicationToSource_none: SourceWhereInput
}

type Query {
  speakers(where: SpeakerWhereInput, orderBy: SpeakerOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): [Speaker]!
  speechAPIConversations(where: SpeechAPIConversationWhereInput, orderBy: SpeechAPIConversationOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): [SpeechAPIConversation]!
  sources(where: SourceWhereInput, orderBy: SourceOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): [Source]!
  publications(where: PublicationWhereInput, orderBy: PublicationOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): [Publication]!
  dates(where: DateWhereInput, orderBy: DateOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): [Date]!
  thumbnails(where: ThumbnailWhereInput, orderBy: ThumbnailOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): [Thumbnail]!
  users(where: UserWhereInput, orderBy: UserOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): [User]!
  videoMetadatas(where: VideoMetadataWhereInput, orderBy: VideoMetadataOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): [VideoMetadata]!
  speechAPIWords(where: SpeechAPIWordWhereInput, orderBy: SpeechAPIWordOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): [SpeechAPIWord]!
  speechAPIConversationBlocks(where: SpeechAPIConversationBlockWhereInput, orderBy: SpeechAPIConversationBlockOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): [SpeechAPIConversationBlock]!
  videoUploads(where: VideoUploadWhereInput, orderBy: VideoUploadOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): [VideoUpload]!
  tags(where: TagWhereInput, orderBy: TagOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): [Tag]!
  videoStorageLinks(where: VideoStorageLinkWhereInput, orderBy: VideoStorageLinkOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): [VideoStorageLink]!
  videos(where: VideoWhereInput, orderBy: VideoOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): [Video]!
  speaker(where: SpeakerWhereUniqueInput!): Speaker
  speechAPIConversation(where: SpeechAPIConversationWhereUniqueInput!): SpeechAPIConversation
  thumbnail(where: ThumbnailWhereUniqueInput!): Thumbnail
  user(where: UserWhereUniqueInput!): User
  speechAPIWord(where: SpeechAPIWordWhereUniqueInput!): SpeechAPIWord
  speechAPIConversationBlock(where: SpeechAPIConversationBlockWhereUniqueInput!): SpeechAPIConversationBlock
  videoUpload(where: VideoUploadWhereUniqueInput!): VideoUpload
  tag(where: TagWhereUniqueInput!): Tag
  videoStorageLink(where: VideoStorageLinkWhereUniqueInput!): VideoStorageLink
  video(where: VideoWhereUniqueInput!): Video
  speakersConnection(where: SpeakerWhereInput, orderBy: SpeakerOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): SpeakerConnection!
  speechAPIConversationsConnection(where: SpeechAPIConversationWhereInput, orderBy: SpeechAPIConversationOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): SpeechAPIConversationConnection!
  sourcesConnection(where: SourceWhereInput, orderBy: SourceOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): SourceConnection!
  publicationsConnection(where: PublicationWhereInput, orderBy: PublicationOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): PublicationConnection!
  datesConnection(where: DateWhereInput, orderBy: DateOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): DateConnection!
  thumbnailsConnection(where: ThumbnailWhereInput, orderBy: ThumbnailOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): ThumbnailConnection!
  usersConnection(where: UserWhereInput, orderBy: UserOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): UserConnection!
  videoMetadatasConnection(where: VideoMetadataWhereInput, orderBy: VideoMetadataOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): VideoMetadataConnection!
  speechAPIWordsConnection(where: SpeechAPIWordWhereInput, orderBy: SpeechAPIWordOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): SpeechAPIWordConnection!
  speechAPIConversationBlocksConnection(where: SpeechAPIConversationBlockWhereInput, orderBy: SpeechAPIConversationBlockOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): SpeechAPIConversationBlockConnection!
  videoUploadsConnection(where: VideoUploadWhereInput, orderBy: VideoUploadOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): VideoUploadConnection!
  tagsConnection(where: TagWhereInput, orderBy: TagOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): TagConnection!
  videoStorageLinksConnection(where: VideoStorageLinkWhereInput, orderBy: VideoStorageLinkOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): VideoStorageLinkConnection!
  videosConnection(where: VideoWhereInput, orderBy: VideoOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): VideoConnection!

  """Fetches an object given its ID"""
  node(
    """The ID of an object"""
    id: ID!
  ): Node
}

enum Role {
  USER
  ADMIN
}

type Source {
  publication(where: PublicationWhereInput): Publication!
  url: String!
  title: String
  videos(where: VideoWhereInput, orderBy: VideoOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): [Video!]
  priority: Int!
}

"""A connection to a list of items."""
type SourceConnection {
  """Information to aid in pagination."""
  pageInfo: PageInfo!

  """A list of edges."""
  edges: [SourceEdge]!
  aggregate: AggregateSource!
}

input SourceCreateInput {
  url: String!
  title: String
  priority: Int
  publication: PublicationCreateOneInput!
  videos: VideoCreateManyInput
}

input SourceCreateManyInput {
  create: [SourceCreateInput!]
}

"""An edge in a connection."""
type SourceEdge {
  """The item at the end of the edge."""
  node: Source!

  """A cursor for use in pagination."""
  cursor: String!
}

enum SourceOrderByInput {
  url_ASC
  url_DESC
  title_ASC
  title_DESC
  priority_ASC
  priority_DESC
  id_ASC
  id_DESC
  updatedAt_ASC
  updatedAt_DESC
  createdAt_ASC
  createdAt_DESC
}

type SourcePreviousValues {
  url: String!
  title: String
  priority: Int!
}

type SourceSubscriptionPayload {
  mutation: MutationType!
  node: Source
  updatedFields: [String!]
  previousValues: SourcePreviousValues
}

input SourceSubscriptionWhereInput {
  """Logical AND on all given filters."""
  AND: [SourceSubscriptionWhereInput!]

  """Logical OR on all given filters."""
  OR: [SourceSubscriptionWhereInput!]

  """Logical NOT on all given filters combined by AND."""
  NOT: [SourceSubscriptionWhereInput!]

  """
  The subscription event gets dispatched when it's listed in mutation_in
  """
  mutation_in: [MutationType!]

  """
  The subscription event gets only dispatched when one of the updated fields names is included in this list
  """
  updatedFields_contains: String

  """
  The subscription event gets only dispatched when all of the field names included in this list have been updated
  """
  updatedFields_contains_every: [String!]

  """
  The subscription event gets only dispatched when some of the field names included in this list have been updated
  """
  updatedFields_contains_some: [String!]
  node: SourceWhereInput
}

input SourceUpdateInput {
  url: String
  title: String
  priority: Int
  publication: PublicationUpdateOneInput
  videos: VideoUpdateManyInput
}

input SourceUpdateManyInput {
  create: [SourceCreateInput!]
}

input SourceWhereInput {
  """Logical AND on all given filters."""
  AND: [SourceWhereInput!]

  """Logical OR on all given filters."""
  OR: [SourceWhereInput!]

  """Logical NOT on all given filters combined by AND."""
  NOT: [SourceWhereInput!]
  url: String

  """All values that are not equal to given value."""
  url_not: String

  """All values that are contained in given list."""
  url_in: [String!]

  """All values that are not contained in given list."""
  url_not_in: [String!]

  """All values less than the given value."""
  url_lt: String

  """All values less than or equal the given value."""
  url_lte: String

  """All values greater than the given value."""
  url_gt: String

  """All values greater than or equal the given value."""
  url_gte: String

  """All values containing the given string."""
  url_contains: String

  """All values not containing the given string."""
  url_not_contains: String

  """All values starting with the given string."""
  url_starts_with: String

  """All values not starting with the given string."""
  url_not_starts_with: String

  """All values ending with the given string."""
  url_ends_with: String

  """All values not ending with the given string."""
  url_not_ends_with: String
  title: String

  """All values that are not equal to given value."""
  title_not: String

  """All values that are contained in given list."""
  title_in: [String!]

  """All values that are not contained in given list."""
  title_not_in: [String!]

  """All values less than the given value."""
  title_lt: String

  """All values less than or equal the given value."""
  title_lte: String

  """All values greater than the given value."""
  title_gt: String

  """All values greater than or equal the given value."""
  title_gte: String

  """All values containing the given string."""
  title_contains: String

  """All values not containing the given string."""
  title_not_contains: String

  """All values starting with the given string."""
  title_starts_with: String

  """All values not starting with the given string."""
  title_not_starts_with: String

  """All values ending with the given string."""
  title_ends_with: String

  """All values not ending with the given string."""
  title_not_ends_with: String
  priority: Int

  """All values that are not equal to given value."""
  priority_not: Int

  """All values that are contained in given list."""
  priority_in: [Int!]

  """All values that are not contained in given list."""
  priority_not_in: [Int!]

  """All values less than the given value."""
  priority_lt: Int

  """All values less than or equal the given value."""
  priority_lte: Int

  """All values greater than the given value."""
  priority_gt: Int

  """All values greater than or equal the given value."""
  priority_gte: Int
  publication: PublicationWhereInput
  videos_every: VideoWhereInput
  videos_some: VideoWhereInput
  videos_none: VideoWhereInput
  _MagicalBackRelation_SourceToVideoMetadata_every: VideoMetadataWhereInput
  _MagicalBackRelation_SourceToVideoMetadata_some: VideoMetadataWhereInput
  _MagicalBackRelation_SourceToVideoMetadata_none: VideoMetadataWhereInput
}

type Speaker {
  name: String!
  avatarPath: String!
  title: String!
}

"""A connection to a list of items."""
type SpeakerConnection {
  """Information to aid in pagination."""
  pageInfo: PageInfo!

  """A list of edges."""
  edges: [SpeakerEdge]!
  aggregate: AggregateSpeaker!
}

input SpeakerCreateInput {
  name: String!
  avatarPath: String!
  title: String!
}

"""An edge in a connection."""
type SpeakerEdge {
  """The item at the end of the edge."""
  node: Speaker!

  """A cursor for use in pagination."""
  cursor: String!
}

enum SpeakerOrderByInput {
  name_ASC
  name_DESC
  avatarPath_ASC
  avatarPath_DESC
  title_ASC
  title_DESC
  id_ASC
  id_DESC
  updatedAt_ASC
  updatedAt_DESC
  createdAt_ASC
  createdAt_DESC
}

type SpeakerPreviousValues {
  name: String!
  avatarPath: String!
  title: String!
}

type SpeakerSubscriptionPayload {
  mutation: MutationType!
  node: Speaker
  updatedFields: [String!]
  previousValues: SpeakerPreviousValues
}

input SpeakerSubscriptionWhereInput {
  """Logical AND on all given filters."""
  AND: [SpeakerSubscriptionWhereInput!]

  """Logical OR on all given filters."""
  OR: [SpeakerSubscriptionWhereInput!]

  """Logical NOT on all given filters combined by AND."""
  NOT: [SpeakerSubscriptionWhereInput!]

  """
  The subscription event gets dispatched when it's listed in mutation_in
  """
  mutation_in: [MutationType!]

  """
  The subscription event gets only dispatched when one of the updated fields names is included in this list
  """
  updatedFields_contains: String

  """
  The subscription event gets only dispatched when all of the field names included in this list have been updated
  """
  updatedFields_contains_every: [String!]

  """
  The subscription event gets only dispatched when some of the field names included in this list have been updated
  """
  updatedFields_contains_some: [String!]
  node: SpeakerWhereInput
}

input SpeakerUpdateInput {
  name: String
  avatarPath: String
  title: String
}

input SpeakerWhereInput {
  """Logical AND on all given filters."""
  AND: [SpeakerWhereInput!]

  """Logical OR on all given filters."""
  OR: [SpeakerWhereInput!]

  """Logical NOT on all given filters combined by AND."""
  NOT: [SpeakerWhereInput!]
  name: String

  """All values that are not equal to given value."""
  name_not: String

  """All values that are contained in given list."""
  name_in: [String!]

  """All values that are not contained in given list."""
  name_not_in: [String!]

  """All values less than the given value."""
  name_lt: String

  """All values less than or equal the given value."""
  name_lte: String

  """All values greater than the given value."""
  name_gt: String

  """All values greater than or equal the given value."""
  name_gte: String

  """All values containing the given string."""
  name_contains: String

  """All values not containing the given string."""
  name_not_contains: String

  """All values starting with the given string."""
  name_starts_with: String

  """All values not starting with the given string."""
  name_not_starts_with: String

  """All values ending with the given string."""
  name_ends_with: String

  """All values not ending with the given string."""
  name_not_ends_with: String
  avatarPath: String

  """All values that are not equal to given value."""
  avatarPath_not: String

  """All values that are contained in given list."""
  avatarPath_in: [String!]

  """All values that are not contained in given list."""
  avatarPath_not_in: [String!]

  """All values less than the given value."""
  avatarPath_lt: String

  """All values less than or equal the given value."""
  avatarPath_lte: String

  """All values greater than the given value."""
  avatarPath_gt: String

  """All values greater than or equal the given value."""
  avatarPath_gte: String

  """All values containing the given string."""
  avatarPath_contains: String

  """All values not containing the given string."""
  avatarPath_not_contains: String

  """All values starting with the given string."""
  avatarPath_starts_with: String

  """All values not starting with the given string."""
  avatarPath_not_starts_with: String

  """All values ending with the given string."""
  avatarPath_ends_with: String

  """All values not ending with the given string."""
  avatarPath_not_ends_with: String
  title: String

  """All values that are not equal to given value."""
  title_not: String

  """All values that are contained in given list."""
  title_in: [String!]

  """All values that are not contained in given list."""
  title_not_in: [String!]

  """All values less than the given value."""
  title_lt: String

  """All values less than or equal the given value."""
  title_lte: String

  """All values greater than the given value."""
  title_gt: String

  """All values greater than or equal the given value."""
  title_gte: String

  """All values containing the given string."""
  title_contains: String

  """All values not containing the given string."""
  title_not_contains: String

  """All values starting with the given string."""
  title_starts_with: String

  """All values not starting with the given string."""
  title_not_starts_with: String

  """All values ending with the given string."""
  title_ends_with: String

  """All values not ending with the given string."""
  title_not_ends_with: String
}

input SpeakerWhereUniqueInput {
  name: String
}

type SpeechAPIConversation implements Node {
  id: ID!
  videoUpload(where: VideoUploadWhereInput): VideoUpload!
  conversation(where: SpeechAPIConversationBlockWhereInput, orderBy: SpeechAPIConversationBlockOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): [SpeechAPIConversationBlock!]
}

type SpeechAPIConversationBlock implements Node {
  id: ID!
  speakerTag: Int!
  words(where: SpeechAPIWordWhereInput, orderBy: SpeechAPIWordOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): [SpeechAPIWord!]
  videoUpload(where: VideoUploadWhereInput): VideoUpload!
}

"""A connection to a list of items."""
type SpeechAPIConversationBlockConnection {
  """Information to aid in pagination."""
  pageInfo: PageInfo!

  """A list of edges."""
  edges: [SpeechAPIConversationBlockEdge]!
  aggregate: AggregateSpeechAPIConversationBlock!
}

input SpeechAPIConversationBlockCreateInput {
  speakerTag: Int!
  words: SpeechAPIWordCreateManyInput
  videoUpload: VideoUploadCreateOneInput!
}

input SpeechAPIConversationBlockCreateManyInput {
  create: [SpeechAPIConversationBlockCreateInput!]
  connect: [SpeechAPIConversationBlockWhereUniqueInput!]
}

"""An edge in a connection."""
type SpeechAPIConversationBlockEdge {
  """The item at the end of the edge."""
  node: SpeechAPIConversationBlock!

  """A cursor for use in pagination."""
  cursor: String!
}

enum SpeechAPIConversationBlockOrderByInput {
  id_ASC
  id_DESC
  speakerTag_ASC
  speakerTag_DESC
  updatedAt_ASC
  updatedAt_DESC
  createdAt_ASC
  createdAt_DESC
}

type SpeechAPIConversationBlockPreviousValues {
  id: ID!
  speakerTag: Int!
}

type SpeechAPIConversationBlockSubscriptionPayload {
  mutation: MutationType!
  node: SpeechAPIConversationBlock
  updatedFields: [String!]
  previousValues: SpeechAPIConversationBlockPreviousValues
}

input SpeechAPIConversationBlockSubscriptionWhereInput {
  """Logical AND on all given filters."""
  AND: [SpeechAPIConversationBlockSubscriptionWhereInput!]

  """Logical OR on all given filters."""
  OR: [SpeechAPIConversationBlockSubscriptionWhereInput!]

  """Logical NOT on all given filters combined by AND."""
  NOT: [SpeechAPIConversationBlockSubscriptionWhereInput!]

  """
  The subscription event gets dispatched when it's listed in mutation_in
  """
  mutation_in: [MutationType!]

  """
  The subscription event gets only dispatched when one of the updated fields names is included in this list
  """
  updatedFields_contains: String

  """
  The subscription event gets only dispatched when all of the field names included in this list have been updated
  """
  updatedFields_contains_every: [String!]

  """
  The subscription event gets only dispatched when some of the field names included in this list have been updated
  """
  updatedFields_contains_some: [String!]
  node: SpeechAPIConversationBlockWhereInput
}

input SpeechAPIConversationBlockUpdateDataInput {
  speakerTag: Int
  words: SpeechAPIWordUpdateManyInput
  videoUpload: VideoUploadUpdateOneInput
}

input SpeechAPIConversationBlockUpdateInput {
  speakerTag: Int
  words: SpeechAPIWordUpdateManyInput
  videoUpload: VideoUploadUpdateOneInput
}

input SpeechAPIConversationBlockUpdateManyInput {
  create: [SpeechAPIConversationBlockCreateInput!]
  connect: [SpeechAPIConversationBlockWhereUniqueInput!]
  disconnect: [SpeechAPIConversationBlockWhereUniqueInput!]
  delete: [SpeechAPIConversationBlockWhereUniqueInput!]
  update: [SpeechAPIConversationBlockUpdateWithWhereUniqueNestedInput!]
  upsert: [SpeechAPIConversationBlockUpsertWithWhereUniqueNestedInput!]
}

input SpeechAPIConversationBlockUpdateWithWhereUniqueNestedInput {
  where: SpeechAPIConversationBlockWhereUniqueInput!
  data: SpeechAPIConversationBlockUpdateDataInput!
}

input SpeechAPIConversationBlockUpsertWithWhereUniqueNestedInput {
  where: SpeechAPIConversationBlockWhereUniqueInput!
  update: SpeechAPIConversationBlockUpdateDataInput!
  create: SpeechAPIConversationBlockCreateInput!
}

input SpeechAPIConversationBlockWhereInput {
  """Logical AND on all given filters."""
  AND: [SpeechAPIConversationBlockWhereInput!]

  """Logical OR on all given filters."""
  OR: [SpeechAPIConversationBlockWhereInput!]

  """Logical NOT on all given filters combined by AND."""
  NOT: [SpeechAPIConversationBlockWhereInput!]
  id: ID

  """All values that are not equal to given value."""
  id_not: ID

  """All values that are contained in given list."""
  id_in: [ID!]

  """All values that are not contained in given list."""
  id_not_in: [ID!]

  """All values less than the given value."""
  id_lt: ID

  """All values less than or equal the given value."""
  id_lte: ID

  """All values greater than the given value."""
  id_gt: ID

  """All values greater than or equal the given value."""
  id_gte: ID

  """All values containing the given string."""
  id_contains: ID

  """All values not containing the given string."""
  id_not_contains: ID

  """All values starting with the given string."""
  id_starts_with: ID

  """All values not starting with the given string."""
  id_not_starts_with: ID

  """All values ending with the given string."""
  id_ends_with: ID

  """All values not ending with the given string."""
  id_not_ends_with: ID
  speakerTag: Int

  """All values that are not equal to given value."""
  speakerTag_not: Int

  """All values that are contained in given list."""
  speakerTag_in: [Int!]

  """All values that are not contained in given list."""
  speakerTag_not_in: [Int!]

  """All values less than the given value."""
  speakerTag_lt: Int

  """All values less than or equal the given value."""
  speakerTag_lte: Int

  """All values greater than the given value."""
  speakerTag_gt: Int

  """All values greater than or equal the given value."""
  speakerTag_gte: Int
  words_every: SpeechAPIWordWhereInput
  words_some: SpeechAPIWordWhereInput
  words_none: SpeechAPIWordWhereInput
  videoUpload: VideoUploadWhereInput
  _MagicalBackRelation_SpeechAPIConversationToSpeechAPIConversationBlock_every: SpeechAPIConversationWhereInput
  _MagicalBackRelation_SpeechAPIConversationToSpeechAPIConversationBlock_some: SpeechAPIConversationWhereInput
  _MagicalBackRelation_SpeechAPIConversationToSpeechAPIConversationBlock_none: SpeechAPIConversationWhereInput
}

input SpeechAPIConversationBlockWhereUniqueInput {
  id: ID
}

"""A connection to a list of items."""
type SpeechAPIConversationConnection {
  """Information to aid in pagination."""
  pageInfo: PageInfo!

  """A list of edges."""
  edges: [SpeechAPIConversationEdge]!
  aggregate: AggregateSpeechAPIConversation!
}

input SpeechAPIConversationCreateInput {
  videoUpload: VideoUploadCreateOneWithoutGeneratedConversationInput!
  conversation: SpeechAPIConversationBlockCreateManyInput
}

input SpeechAPIConversationCreateOneWithoutVideoUploadInput {
  create: SpeechAPIConversationCreateWithoutVideoUploadInput
  connect: SpeechAPIConversationWhereUniqueInput
}

input SpeechAPIConversationCreateWithoutVideoUploadInput {
  conversation: SpeechAPIConversationBlockCreateManyInput
}

"""An edge in a connection."""
type SpeechAPIConversationEdge {
  """The item at the end of the edge."""
  node: SpeechAPIConversation!

  """A cursor for use in pagination."""
  cursor: String!
}

enum SpeechAPIConversationOrderByInput {
  id_ASC
  id_DESC
  updatedAt_ASC
  updatedAt_DESC
  createdAt_ASC
  createdAt_DESC
}

type SpeechAPIConversationPreviousValues {
  id: ID!
}

type SpeechAPIConversationSubscriptionPayload {
  mutation: MutationType!
  node: SpeechAPIConversation
  updatedFields: [String!]
  previousValues: SpeechAPIConversationPreviousValues
}

input SpeechAPIConversationSubscriptionWhereInput {
  """Logical AND on all given filters."""
  AND: [SpeechAPIConversationSubscriptionWhereInput!]

  """Logical OR on all given filters."""
  OR: [SpeechAPIConversationSubscriptionWhereInput!]

  """Logical NOT on all given filters combined by AND."""
  NOT: [SpeechAPIConversationSubscriptionWhereInput!]

  """
  The subscription event gets dispatched when it's listed in mutation_in
  """
  mutation_in: [MutationType!]

  """
  The subscription event gets only dispatched when one of the updated fields names is included in this list
  """
  updatedFields_contains: String

  """
  The subscription event gets only dispatched when all of the field names included in this list have been updated
  """
  updatedFields_contains_every: [String!]

  """
  The subscription event gets only dispatched when some of the field names included in this list have been updated
  """
  updatedFields_contains_some: [String!]
  node: SpeechAPIConversationWhereInput
}

input SpeechAPIConversationUpdateInput {
  videoUpload: VideoUploadUpdateOneWithoutGeneratedConversationInput
  conversation: SpeechAPIConversationBlockUpdateManyInput
}

input SpeechAPIConversationUpdateOneWithoutVideoUploadInput {
  create: SpeechAPIConversationCreateWithoutVideoUploadInput
  connect: SpeechAPIConversationWhereUniqueInput
  disconnect: Boolean
  delete: Boolean
  update: SpeechAPIConversationUpdateWithoutVideoUploadDataInput
  upsert: SpeechAPIConversationUpsertWithoutVideoUploadInput
}

input SpeechAPIConversationUpdateWithoutVideoUploadDataInput {
  conversation: SpeechAPIConversationBlockUpdateManyInput
}

input SpeechAPIConversationUpsertWithoutVideoUploadInput {
  update: SpeechAPIConversationUpdateWithoutVideoUploadDataInput!
  create: SpeechAPIConversationCreateWithoutVideoUploadInput!
}

input SpeechAPIConversationWhereInput {
  """Logical AND on all given filters."""
  AND: [SpeechAPIConversationWhereInput!]

  """Logical OR on all given filters."""
  OR: [SpeechAPIConversationWhereInput!]

  """Logical NOT on all given filters combined by AND."""
  NOT: [SpeechAPIConversationWhereInput!]
  id: ID

  """All values that are not equal to given value."""
  id_not: ID

  """All values that are contained in given list."""
  id_in: [ID!]

  """All values that are not contained in given list."""
  id_not_in: [ID!]

  """All values less than the given value."""
  id_lt: ID

  """All values less than or equal the given value."""
  id_lte: ID

  """All values greater than the given value."""
  id_gt: ID

  """All values greater than or equal the given value."""
  id_gte: ID

  """All values containing the given string."""
  id_contains: ID

  """All values not containing the given string."""
  id_not_contains: ID

  """All values starting with the given string."""
  id_starts_with: ID

  """All values not starting with the given string."""
  id_not_starts_with: ID

  """All values ending with the given string."""
  id_ends_with: ID

  """All values not ending with the given string."""
  id_not_ends_with: ID
  videoUpload: VideoUploadWhereInput
  conversation_every: SpeechAPIConversationBlockWhereInput
  conversation_some: SpeechAPIConversationBlockWhereInput
  conversation_none: SpeechAPIConversationBlockWhereInput
}

input SpeechAPIConversationWhereUniqueInput {
  id: ID
}

type SpeechAPIWord implements Node {
  id: ID!
  startTime: Int!
  endTime: Int!
  word: String!
  speakerTag: Int!
  videoUpload(where: VideoUploadWhereInput): VideoUpload!
}

"""A connection to a list of items."""
type SpeechAPIWordConnection {
  """Information to aid in pagination."""
  pageInfo: PageInfo!

  """A list of edges."""
  edges: [SpeechAPIWordEdge]!
  aggregate: AggregateSpeechAPIWord!
}

input SpeechAPIWordCreateInput {
  startTime: Int!
  endTime: Int!
  word: String!
  speakerTag: Int!
  videoUpload: VideoUploadCreateOneInput!
}

input SpeechAPIWordCreateManyInput {
  create: [SpeechAPIWordCreateInput!]
  connect: [SpeechAPIWordWhereUniqueInput!]
}

"""An edge in a connection."""
type SpeechAPIWordEdge {
  """The item at the end of the edge."""
  node: SpeechAPIWord!

  """A cursor for use in pagination."""
  cursor: String!
}

enum SpeechAPIWordOrderByInput {
  id_ASC
  id_DESC
  startTime_ASC
  startTime_DESC
  endTime_ASC
  endTime_DESC
  word_ASC
  word_DESC
  speakerTag_ASC
  speakerTag_DESC
  updatedAt_ASC
  updatedAt_DESC
  createdAt_ASC
  createdAt_DESC
}

type SpeechAPIWordPreviousValues {
  id: ID!
  startTime: Int!
  endTime: Int!
  word: String!
  speakerTag: Int!
}

type SpeechAPIWordSubscriptionPayload {
  mutation: MutationType!
  node: SpeechAPIWord
  updatedFields: [String!]
  previousValues: SpeechAPIWordPreviousValues
}

input SpeechAPIWordSubscriptionWhereInput {
  """Logical AND on all given filters."""
  AND: [SpeechAPIWordSubscriptionWhereInput!]

  """Logical OR on all given filters."""
  OR: [SpeechAPIWordSubscriptionWhereInput!]

  """Logical NOT on all given filters combined by AND."""
  NOT: [SpeechAPIWordSubscriptionWhereInput!]

  """
  The subscription event gets dispatched when it's listed in mutation_in
  """
  mutation_in: [MutationType!]

  """
  The subscription event gets only dispatched when one of the updated fields names is included in this list
  """
  updatedFields_contains: String

  """
  The subscription event gets only dispatched when all of the field names included in this list have been updated
  """
  updatedFields_contains_every: [String!]

  """
  The subscription event gets only dispatched when some of the field names included in this list have been updated
  """
  updatedFields_contains_some: [String!]
  node: SpeechAPIWordWhereInput
}

input SpeechAPIWordUpdateDataInput {
  startTime: Int
  endTime: Int
  word: String
  speakerTag: Int
  videoUpload: VideoUploadUpdateOneInput
}

input SpeechAPIWordUpdateInput {
  startTime: Int
  endTime: Int
  word: String
  speakerTag: Int
  videoUpload: VideoUploadUpdateOneInput
}

input SpeechAPIWordUpdateManyInput {
  create: [SpeechAPIWordCreateInput!]
  connect: [SpeechAPIWordWhereUniqueInput!]
  disconnect: [SpeechAPIWordWhereUniqueInput!]
  delete: [SpeechAPIWordWhereUniqueInput!]
  update: [SpeechAPIWordUpdateWithWhereUniqueNestedInput!]
  upsert: [SpeechAPIWordUpsertWithWhereUniqueNestedInput!]
}

input SpeechAPIWordUpdateWithWhereUniqueNestedInput {
  where: SpeechAPIWordWhereUniqueInput!
  data: SpeechAPIWordUpdateDataInput!
}

input SpeechAPIWordUpsertWithWhereUniqueNestedInput {
  where: SpeechAPIWordWhereUniqueInput!
  update: SpeechAPIWordUpdateDataInput!
  create: SpeechAPIWordCreateInput!
}

input SpeechAPIWordWhereInput {
  """Logical AND on all given filters."""
  AND: [SpeechAPIWordWhereInput!]

  """Logical OR on all given filters."""
  OR: [SpeechAPIWordWhereInput!]

  """Logical NOT on all given filters combined by AND."""
  NOT: [SpeechAPIWordWhereInput!]
  id: ID

  """All values that are not equal to given value."""
  id_not: ID

  """All values that are contained in given list."""
  id_in: [ID!]

  """All values that are not contained in given list."""
  id_not_in: [ID!]

  """All values less than the given value."""
  id_lt: ID

  """All values less than or equal the given value."""
  id_lte: ID

  """All values greater than the given value."""
  id_gt: ID

  """All values greater than or equal the given value."""
  id_gte: ID

  """All values containing the given string."""
  id_contains: ID

  """All values not containing the given string."""
  id_not_contains: ID

  """All values starting with the given string."""
  id_starts_with: ID

  """All values not starting with the given string."""
  id_not_starts_with: ID

  """All values ending with the given string."""
  id_ends_with: ID

  """All values not ending with the given string."""
  id_not_ends_with: ID
  startTime: Int

  """All values that are not equal to given value."""
  startTime_not: Int

  """All values that are contained in given list."""
  startTime_in: [Int!]

  """All values that are not contained in given list."""
  startTime_not_in: [Int!]

  """All values less than the given value."""
  startTime_lt: Int

  """All values less than or equal the given value."""
  startTime_lte: Int

  """All values greater than the given value."""
  startTime_gt: Int

  """All values greater than or equal the given value."""
  startTime_gte: Int
  endTime: Int

  """All values that are not equal to given value."""
  endTime_not: Int

  """All values that are contained in given list."""
  endTime_in: [Int!]

  """All values that are not contained in given list."""
  endTime_not_in: [Int!]

  """All values less than the given value."""
  endTime_lt: Int

  """All values less than or equal the given value."""
  endTime_lte: Int

  """All values greater than the given value."""
  endTime_gt: Int

  """All values greater than or equal the given value."""
  endTime_gte: Int
  word: String

  """All values that are not equal to given value."""
  word_not: String

  """All values that are contained in given list."""
  word_in: [String!]

  """All values that are not contained in given list."""
  word_not_in: [String!]

  """All values less than the given value."""
  word_lt: String

  """All values less than or equal the given value."""
  word_lte: String

  """All values greater than the given value."""
  word_gt: String

  """All values greater than or equal the given value."""
  word_gte: String

  """All values containing the given string."""
  word_contains: String

  """All values not containing the given string."""
  word_not_contains: String

  """All values starting with the given string."""
  word_starts_with: String

  """All values not starting with the given string."""
  word_not_starts_with: String

  """All values ending with the given string."""
  word_ends_with: String

  """All values not ending with the given string."""
  word_not_ends_with: String
  speakerTag: Int

  """All values that are not equal to given value."""
  speakerTag_not: Int

  """All values that are contained in given list."""
  speakerTag_in: [Int!]

  """All values that are not contained in given list."""
  speakerTag_not_in: [Int!]

  """All values less than the given value."""
  speakerTag_lt: Int

  """All values less than or equal the given value."""
  speakerTag_lte: Int

  """All values greater than the given value."""
  speakerTag_gt: Int

  """All values greater than or equal the given value."""
  speakerTag_gte: Int
  videoUpload: VideoUploadWhereInput
  _MagicalBackRelation_SpeechAPIConversationBlockToSpeechAPIWord_every: SpeechAPIConversationBlockWhereInput
  _MagicalBackRelation_SpeechAPIConversationBlockToSpeechAPIWord_some: SpeechAPIConversationBlockWhereInput
  _MagicalBackRelation_SpeechAPIConversationBlockToSpeechAPIWord_none: SpeechAPIConversationBlockWhereInput
}

input SpeechAPIWordWhereUniqueInput {
  id: ID
}

type Subscription {
  speaker(where: SpeakerSubscriptionWhereInput): SpeakerSubscriptionPayload
  speechAPIConversation(where: SpeechAPIConversationSubscriptionWhereInput): SpeechAPIConversationSubscriptionPayload
  source(where: SourceSubscriptionWhereInput): SourceSubscriptionPayload
  publication(where: PublicationSubscriptionWhereInput): PublicationSubscriptionPayload
  date(where: DateSubscriptionWhereInput): DateSubscriptionPayload
  thumbnail(where: ThumbnailSubscriptionWhereInput): ThumbnailSubscriptionPayload
  user(where: UserSubscriptionWhereInput): UserSubscriptionPayload
  videoMetadata(where: VideoMetadataSubscriptionWhereInput): VideoMetadataSubscriptionPayload
  speechAPIWord(where: SpeechAPIWordSubscriptionWhereInput): SpeechAPIWordSubscriptionPayload
  speechAPIConversationBlock(where: SpeechAPIConversationBlockSubscriptionWhereInput): SpeechAPIConversationBlockSubscriptionPayload
  videoUpload(where: VideoUploadSubscriptionWhereInput): VideoUploadSubscriptionPayload
  tag(where: TagSubscriptionWhereInput): TagSubscriptionPayload
  videoStorageLink(where: VideoStorageLinkSubscriptionWhereInput): VideoStorageLinkSubscriptionPayload
  video(where: VideoSubscriptionWhereInput): VideoSubscriptionPayload
}

type Tag implements Node {
  id: ID!
  name: String!
  videos(where: VideoWhereInput, orderBy: VideoOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): [Video!]
}

"""A connection to a list of items."""
type TagConnection {
  """Information to aid in pagination."""
  pageInfo: PageInfo!

  """A list of edges."""
  edges: [TagEdge]!
  aggregate: AggregateTag!
}

input TagCreateInput {
  name: String!
  videos: VideoCreateManyInput
}

input TagCreateManyInput {
  create: [TagCreateInput!]
  connect: [TagWhereUniqueInput!]
}

"""An edge in a connection."""
type TagEdge {
  """The item at the end of the edge."""
  node: Tag!

  """A cursor for use in pagination."""
  cursor: String!
}

enum TagOrderByInput {
  id_ASC
  id_DESC
  name_ASC
  name_DESC
  updatedAt_ASC
  updatedAt_DESC
  createdAt_ASC
  createdAt_DESC
}

type TagPreviousValues {
  id: ID!
  name: String!
}

type TagSubscriptionPayload {
  mutation: MutationType!
  node: Tag
  updatedFields: [String!]
  previousValues: TagPreviousValues
}

input TagSubscriptionWhereInput {
  """Logical AND on all given filters."""
  AND: [TagSubscriptionWhereInput!]

  """Logical OR on all given filters."""
  OR: [TagSubscriptionWhereInput!]

  """Logical NOT on all given filters combined by AND."""
  NOT: [TagSubscriptionWhereInput!]

  """
  The subscription event gets dispatched when it's listed in mutation_in
  """
  mutation_in: [MutationType!]

  """
  The subscription event gets only dispatched when one of the updated fields names is included in this list
  """
  updatedFields_contains: String

  """
  The subscription event gets only dispatched when all of the field names included in this list have been updated
  """
  updatedFields_contains_every: [String!]

  """
  The subscription event gets only dispatched when some of the field names included in this list have been updated
  """
  updatedFields_contains_some: [String!]
  node: TagWhereInput
}

input TagUpdateDataInput {
  name: String
  videos: VideoUpdateManyInput
}

input TagUpdateInput {
  name: String
  videos: VideoUpdateManyInput
}

input TagUpdateManyInput {
  create: [TagCreateInput!]
  connect: [TagWhereUniqueInput!]
  disconnect: [TagWhereUniqueInput!]
  delete: [TagWhereUniqueInput!]
  update: [TagUpdateWithWhereUniqueNestedInput!]
  upsert: [TagUpsertWithWhereUniqueNestedInput!]
}

input TagUpdateWithWhereUniqueNestedInput {
  where: TagWhereUniqueInput!
  data: TagUpdateDataInput!
}

input TagUpsertWithWhereUniqueNestedInput {
  where: TagWhereUniqueInput!
  update: TagUpdateDataInput!
  create: TagCreateInput!
}

input TagWhereInput {
  """Logical AND on all given filters."""
  AND: [TagWhereInput!]

  """Logical OR on all given filters."""
  OR: [TagWhereInput!]

  """Logical NOT on all given filters combined by AND."""
  NOT: [TagWhereInput!]
  id: ID

  """All values that are not equal to given value."""
  id_not: ID

  """All values that are contained in given list."""
  id_in: [ID!]

  """All values that are not contained in given list."""
  id_not_in: [ID!]

  """All values less than the given value."""
  id_lt: ID

  """All values less than or equal the given value."""
  id_lte: ID

  """All values greater than the given value."""
  id_gt: ID

  """All values greater than or equal the given value."""
  id_gte: ID

  """All values containing the given string."""
  id_contains: ID

  """All values not containing the given string."""
  id_not_contains: ID

  """All values starting with the given string."""
  id_starts_with: ID

  """All values not starting with the given string."""
  id_not_starts_with: ID

  """All values ending with the given string."""
  id_ends_with: ID

  """All values not ending with the given string."""
  id_not_ends_with: ID
  name: String

  """All values that are not equal to given value."""
  name_not: String

  """All values that are contained in given list."""
  name_in: [String!]

  """All values that are not contained in given list."""
  name_not_in: [String!]

  """All values less than the given value."""
  name_lt: String

  """All values less than or equal the given value."""
  name_lte: String

  """All values greater than the given value."""
  name_gt: String

  """All values greater than or equal the given value."""
  name_gte: String

  """All values containing the given string."""
  name_contains: String

  """All values not containing the given string."""
  name_not_contains: String

  """All values starting with the given string."""
  name_starts_with: String

  """All values not starting with the given string."""
  name_not_starts_with: String

  """All values ending with the given string."""
  name_ends_with: String

  """All values not ending with the given string."""
  name_not_ends_with: String
  videos_every: VideoWhereInput
  videos_some: VideoWhereInput
  videos_none: VideoWhereInput
  _MagicalBackRelation_TagToVideoMetadata_every: VideoMetadataWhereInput
  _MagicalBackRelation_TagToVideoMetadata_some: VideoMetadataWhereInput
  _MagicalBackRelation_TagToVideoMetadata_none: VideoMetadataWhereInput
}

input TagWhereUniqueInput {
  id: ID
}

type Thumbnail implements Node {
  id: ID!
  videoID: ID!
  path: String!
  bucket: String!
}

"""A connection to a list of items."""
type ThumbnailConnection {
  """Information to aid in pagination."""
  pageInfo: PageInfo!

  """A list of edges."""
  edges: [ThumbnailEdge]!
  aggregate: AggregateThumbnail!
}

input ThumbnailCreateInput {
  videoID: ID!
  path: String!
  bucket: String!
}

input ThumbnailCreateOneInput {
  create: ThumbnailCreateInput
  connect: ThumbnailWhereUniqueInput
}

"""An edge in a connection."""
type ThumbnailEdge {
  """The item at the end of the edge."""
  node: Thumbnail!

  """A cursor for use in pagination."""
  cursor: String!
}

enum ThumbnailOrderByInput {
  id_ASC
  id_DESC
  videoID_ASC
  videoID_DESC
  path_ASC
  path_DESC
  bucket_ASC
  bucket_DESC
  updatedAt_ASC
  updatedAt_DESC
  createdAt_ASC
  createdAt_DESC
}

type ThumbnailPreviousValues {
  id: ID!
  videoID: ID!
  path: String!
  bucket: String!
}

type ThumbnailSubscriptionPayload {
  mutation: MutationType!
  node: Thumbnail
  updatedFields: [String!]
  previousValues: ThumbnailPreviousValues
}

input ThumbnailSubscriptionWhereInput {
  """Logical AND on all given filters."""
  AND: [ThumbnailSubscriptionWhereInput!]

  """Logical OR on all given filters."""
  OR: [ThumbnailSubscriptionWhereInput!]

  """Logical NOT on all given filters combined by AND."""
  NOT: [ThumbnailSubscriptionWhereInput!]

  """
  The subscription event gets dispatched when it's listed in mutation_in
  """
  mutation_in: [MutationType!]

  """
  The subscription event gets only dispatched when one of the updated fields names is included in this list
  """
  updatedFields_contains: String

  """
  The subscription event gets only dispatched when all of the field names included in this list have been updated
  """
  updatedFields_contains_every: [String!]

  """
  The subscription event gets only dispatched when some of the field names included in this list have been updated
  """
  updatedFields_contains_some: [String!]
  node: ThumbnailWhereInput
}

input ThumbnailUpdateDataInput {
  videoID: ID
  path: String
  bucket: String
}

input ThumbnailUpdateInput {
  videoID: ID
  path: String
  bucket: String
}

input ThumbnailUpdateOneInput {
  create: ThumbnailCreateInput
  connect: ThumbnailWhereUniqueInput
  disconnect: Boolean
  delete: Boolean
  update: ThumbnailUpdateDataInput
  upsert: ThumbnailUpsertNestedInput
}

input ThumbnailUpsertNestedInput {
  update: ThumbnailUpdateDataInput!
  create: ThumbnailCreateInput!
}

input ThumbnailWhereInput {
  """Logical AND on all given filters."""
  AND: [ThumbnailWhereInput!]

  """Logical OR on all given filters."""
  OR: [ThumbnailWhereInput!]

  """Logical NOT on all given filters combined by AND."""
  NOT: [ThumbnailWhereInput!]
  id: ID

  """All values that are not equal to given value."""
  id_not: ID

  """All values that are contained in given list."""
  id_in: [ID!]

  """All values that are not contained in given list."""
  id_not_in: [ID!]

  """All values less than the given value."""
  id_lt: ID

  """All values less than or equal the given value."""
  id_lte: ID

  """All values greater than the given value."""
  id_gt: ID

  """All values greater than or equal the given value."""
  id_gte: ID

  """All values containing the given string."""
  id_contains: ID

  """All values not containing the given string."""
  id_not_contains: ID

  """All values starting with the given string."""
  id_starts_with: ID

  """All values not starting with the given string."""
  id_not_starts_with: ID

  """All values ending with the given string."""
  id_ends_with: ID

  """All values not ending with the given string."""
  id_not_ends_with: ID
  videoID: ID

  """All values that are not equal to given value."""
  videoID_not: ID

  """All values that are contained in given list."""
  videoID_in: [ID!]

  """All values that are not contained in given list."""
  videoID_not_in: [ID!]

  """All values less than the given value."""
  videoID_lt: ID

  """All values less than or equal the given value."""
  videoID_lte: ID

  """All values greater than the given value."""
  videoID_gt: ID

  """All values greater than or equal the given value."""
  videoID_gte: ID

  """All values containing the given string."""
  videoID_contains: ID

  """All values not containing the given string."""
  videoID_not_contains: ID

  """All values starting with the given string."""
  videoID_starts_with: ID

  """All values not starting with the given string."""
  videoID_not_starts_with: ID

  """All values ending with the given string."""
  videoID_ends_with: ID

  """All values not ending with the given string."""
  videoID_not_ends_with: ID
  path: String

  """All values that are not equal to given value."""
  path_not: String

  """All values that are contained in given list."""
  path_in: [String!]

  """All values that are not contained in given list."""
  path_not_in: [String!]

  """All values less than the given value."""
  path_lt: String

  """All values less than or equal the given value."""
  path_lte: String

  """All values greater than the given value."""
  path_gt: String

  """All values greater than or equal the given value."""
  path_gte: String

  """All values containing the given string."""
  path_contains: String

  """All values not containing the given string."""
  path_not_contains: String

  """All values starting with the given string."""
  path_starts_with: String

  """All values not starting with the given string."""
  path_not_starts_with: String

  """All values ending with the given string."""
  path_ends_with: String

  """All values not ending with the given string."""
  path_not_ends_with: String
  bucket: String

  """All values that are not equal to given value."""
  bucket_not: String

  """All values that are contained in given list."""
  bucket_in: [String!]

  """All values that are not contained in given list."""
  bucket_not_in: [String!]

  """All values less than the given value."""
  bucket_lt: String

  """All values less than or equal the given value."""
  bucket_lte: String

  """All values greater than the given value."""
  bucket_gt: String

  """All values greater than or equal the given value."""
  bucket_gte: String

  """All values containing the given string."""
  bucket_contains: String

  """All values not containing the given string."""
  bucket_not_contains: String

  """All values starting with the given string."""
  bucket_starts_with: String

  """All values not starting with the given string."""
  bucket_not_starts_with: String

  """All values ending with the given string."""
  bucket_ends_with: String

  """All values not ending with the given string."""
  bucket_not_ends_with: String
  _MagicalBackRelation_VideoUploadThumbnailRelation_every: VideoUploadWhereInput
  _MagicalBackRelation_VideoUploadThumbnailRelation_some: VideoUploadWhereInput
  _MagicalBackRelation_VideoUploadThumbnailRelation_none: VideoUploadWhereInput
}

input ThumbnailWhereUniqueInput {
  id: ID
}

type User implements Node {
  id: ID!
  email: String
  auth0Id: String
  role: Role
  displayName: String
  avatar: String
  givenName: String
  familyName: String
  adminRoles: [AdminRole!]!
}

"""A connection to a list of items."""
type UserConnection {
  """Information to aid in pagination."""
  pageInfo: PageInfo!

  """A list of edges."""
  edges: [UserEdge]!
  aggregate: AggregateUser!
}

input UserCreateadminRolesInput {
  set: [AdminRole!]
}

input UserCreateInput {
  email: String
  auth0Id: String
  role: Role
  displayName: String
  avatar: String
  givenName: String
  familyName: String
  adminRoles: UserCreateadminRolesInput
}

input UserCreateOneInput {
  create: UserCreateInput
  connect: UserWhereUniqueInput
}

"""An edge in a connection."""
type UserEdge {
  """The item at the end of the edge."""
  node: User!

  """A cursor for use in pagination."""
  cursor: String!
}

enum UserOrderByInput {
  id_ASC
  id_DESC
  email_ASC
  email_DESC
  auth0Id_ASC
  auth0Id_DESC
  role_ASC
  role_DESC
  displayName_ASC
  displayName_DESC
  avatar_ASC
  avatar_DESC
  givenName_ASC
  givenName_DESC
  familyName_ASC
  familyName_DESC
  updatedAt_ASC
  updatedAt_DESC
  createdAt_ASC
  createdAt_DESC
}

type UserPreviousValues {
  id: ID!
  email: String
  auth0Id: String
  role: Role
  displayName: String
  avatar: String
  givenName: String
  familyName: String
  adminRoles: [AdminRole!]!
}

type UserSubscriptionPayload {
  mutation: MutationType!
  node: User
  updatedFields: [String!]
  previousValues: UserPreviousValues
}

input UserSubscriptionWhereInput {
  """Logical AND on all given filters."""
  AND: [UserSubscriptionWhereInput!]

  """Logical OR on all given filters."""
  OR: [UserSubscriptionWhereInput!]

  """Logical NOT on all given filters combined by AND."""
  NOT: [UserSubscriptionWhereInput!]

  """
  The subscription event gets dispatched when it's listed in mutation_in
  """
  mutation_in: [MutationType!]

  """
  The subscription event gets only dispatched when one of the updated fields names is included in this list
  """
  updatedFields_contains: String

  """
  The subscription event gets only dispatched when all of the field names included in this list have been updated
  """
  updatedFields_contains_every: [String!]

  """
  The subscription event gets only dispatched when some of the field names included in this list have been updated
  """
  updatedFields_contains_some: [String!]
  node: UserWhereInput
}

input UserUpdateadminRolesInput {
  set: [AdminRole!]
}

input UserUpdateDataInput {
  email: String
  auth0Id: String
  role: Role
  displayName: String
  avatar: String
  givenName: String
  familyName: String
  adminRoles: UserUpdateadminRolesInput
}

input UserUpdateInput {
  email: String
  auth0Id: String
  role: Role
  displayName: String
  avatar: String
  givenName: String
  familyName: String
  adminRoles: UserUpdateadminRolesInput
}

input UserUpdateOneInput {
  create: UserCreateInput
  connect: UserWhereUniqueInput
  delete: Boolean
  update: UserUpdateDataInput
  upsert: UserUpsertNestedInput
}

input UserUpsertNestedInput {
  update: UserUpdateDataInput!
  create: UserCreateInput!
}

input UserWhereInput {
  """Logical AND on all given filters."""
  AND: [UserWhereInput!]

  """Logical OR on all given filters."""
  OR: [UserWhereInput!]

  """Logical NOT on all given filters combined by AND."""
  NOT: [UserWhereInput!]
  id: ID

  """All values that are not equal to given value."""
  id_not: ID

  """All values that are contained in given list."""
  id_in: [ID!]

  """All values that are not contained in given list."""
  id_not_in: [ID!]

  """All values less than the given value."""
  id_lt: ID

  """All values less than or equal the given value."""
  id_lte: ID

  """All values greater than the given value."""
  id_gt: ID

  """All values greater than or equal the given value."""
  id_gte: ID

  """All values containing the given string."""
  id_contains: ID

  """All values not containing the given string."""
  id_not_contains: ID

  """All values starting with the given string."""
  id_starts_with: ID

  """All values not starting with the given string."""
  id_not_starts_with: ID

  """All values ending with the given string."""
  id_ends_with: ID

  """All values not ending with the given string."""
  id_not_ends_with: ID
  email: String

  """All values that are not equal to given value."""
  email_not: String

  """All values that are contained in given list."""
  email_in: [String!]

  """All values that are not contained in given list."""
  email_not_in: [String!]

  """All values less than the given value."""
  email_lt: String

  """All values less than or equal the given value."""
  email_lte: String

  """All values greater than the given value."""
  email_gt: String

  """All values greater than or equal the given value."""
  email_gte: String

  """All values containing the given string."""
  email_contains: String

  """All values not containing the given string."""
  email_not_contains: String

  """All values starting with the given string."""
  email_starts_with: String

  """All values not starting with the given string."""
  email_not_starts_with: String

  """All values ending with the given string."""
  email_ends_with: String

  """All values not ending with the given string."""
  email_not_ends_with: String
  auth0Id: String

  """All values that are not equal to given value."""
  auth0Id_not: String

  """All values that are contained in given list."""
  auth0Id_in: [String!]

  """All values that are not contained in given list."""
  auth0Id_not_in: [String!]

  """All values less than the given value."""
  auth0Id_lt: String

  """All values less than or equal the given value."""
  auth0Id_lte: String

  """All values greater than the given value."""
  auth0Id_gt: String

  """All values greater than or equal the given value."""
  auth0Id_gte: String

  """All values containing the given string."""
  auth0Id_contains: String

  """All values not containing the given string."""
  auth0Id_not_contains: String

  """All values starting with the given string."""
  auth0Id_starts_with: String

  """All values not starting with the given string."""
  auth0Id_not_starts_with: String

  """All values ending with the given string."""
  auth0Id_ends_with: String

  """All values not ending with the given string."""
  auth0Id_not_ends_with: String
  role: Role

  """All values that are not equal to given value."""
  role_not: Role

  """All values that are contained in given list."""
  role_in: [Role!]

  """All values that are not contained in given list."""
  role_not_in: [Role!]
  displayName: String

  """All values that are not equal to given value."""
  displayName_not: String

  """All values that are contained in given list."""
  displayName_in: [String!]

  """All values that are not contained in given list."""
  displayName_not_in: [String!]

  """All values less than the given value."""
  displayName_lt: String

  """All values less than or equal the given value."""
  displayName_lte: String

  """All values greater than the given value."""
  displayName_gt: String

  """All values greater than or equal the given value."""
  displayName_gte: String

  """All values containing the given string."""
  displayName_contains: String

  """All values not containing the given string."""
  displayName_not_contains: String

  """All values starting with the given string."""
  displayName_starts_with: String

  """All values not starting with the given string."""
  displayName_not_starts_with: String

  """All values ending with the given string."""
  displayName_ends_with: String

  """All values not ending with the given string."""
  displayName_not_ends_with: String
  avatar: String

  """All values that are not equal to given value."""
  avatar_not: String

  """All values that are contained in given list."""
  avatar_in: [String!]

  """All values that are not contained in given list."""
  avatar_not_in: [String!]

  """All values less than the given value."""
  avatar_lt: String

  """All values less than or equal the given value."""
  avatar_lte: String

  """All values greater than the given value."""
  avatar_gt: String

  """All values greater than or equal the given value."""
  avatar_gte: String

  """All values containing the given string."""
  avatar_contains: String

  """All values not containing the given string."""
  avatar_not_contains: String

  """All values starting with the given string."""
  avatar_starts_with: String

  """All values not starting with the given string."""
  avatar_not_starts_with: String

  """All values ending with the given string."""
  avatar_ends_with: String

  """All values not ending with the given string."""
  avatar_not_ends_with: String
  givenName: String

  """All values that are not equal to given value."""
  givenName_not: String

  """All values that are contained in given list."""
  givenName_in: [String!]

  """All values that are not contained in given list."""
  givenName_not_in: [String!]

  """All values less than the given value."""
  givenName_lt: String

  """All values less than or equal the given value."""
  givenName_lte: String

  """All values greater than the given value."""
  givenName_gt: String

  """All values greater than or equal the given value."""
  givenName_gte: String

  """All values containing the given string."""
  givenName_contains: String

  """All values not containing the given string."""
  givenName_not_contains: String

  """All values starting with the given string."""
  givenName_starts_with: String

  """All values not starting with the given string."""
  givenName_not_starts_with: String

  """All values ending with the given string."""
  givenName_ends_with: String

  """All values not ending with the given string."""
  givenName_not_ends_with: String
  familyName: String

  """All values that are not equal to given value."""
  familyName_not: String

  """All values that are contained in given list."""
  familyName_in: [String!]

  """All values that are not contained in given list."""
  familyName_not_in: [String!]

  """All values less than the given value."""
  familyName_lt: String

  """All values less than or equal the given value."""
  familyName_lte: String

  """All values greater than the given value."""
  familyName_gt: String

  """All values greater than or equal the given value."""
  familyName_gte: String

  """All values containing the given string."""
  familyName_contains: String

  """All values not containing the given string."""
  familyName_not_contains: String

  """All values starting with the given string."""
  familyName_starts_with: String

  """All values not starting with the given string."""
  familyName_not_starts_with: String

  """All values ending with the given string."""
  familyName_ends_with: String

  """All values not ending with the given string."""
  familyName_not_ends_with: String
  _MagicalBackRelation_VideoSubmitter_every: VideoUploadWhereInput
  _MagicalBackRelation_VideoSubmitter_some: VideoUploadWhereInput
  _MagicalBackRelation_VideoSubmitter_none: VideoUploadWhereInput
  _MagicalBackRelation_VideoPublisher_every: VideoUploadWhereInput
  _MagicalBackRelation_VideoPublisher_some: VideoUploadWhereInput
  _MagicalBackRelation_VideoPublisher_none: VideoUploadWhereInput
}

input UserWhereUniqueInput {
  id: ID
  auth0Id: String
}

type Video implements Node {
  id: ID!
  published: Boolean
  advertisingEnabled: Boolean
  views: Int
}

"""A connection to a list of items."""
type VideoConnection {
  """Information to aid in pagination."""
  pageInfo: PageInfo!

  """A list of edges."""
  edges: [VideoEdge]!
  aggregate: AggregateVideo!
}

input VideoCreateInput {
  published: Boolean
  advertisingEnabled: Boolean
  views: Int
}

input VideoCreateManyInput {
  create: [VideoCreateInput!]
  connect: [VideoWhereUniqueInput!]
}

input VideoCreateOneInput {
  create: VideoCreateInput
  connect: VideoWhereUniqueInput
}

"""An edge in a connection."""
type VideoEdge {
  """The item at the end of the edge."""
  node: Video!

  """A cursor for use in pagination."""
  cursor: String!
}

type VideoMetadata {
  title: String
  subtitle: String
  advertisingEnabled: Boolean!
  tags(where: TagWhereInput, orderBy: TagOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): [Tag!]
  sources(where: SourceWhereInput, orderBy: SourceOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): [Source!]
  dateRecorded(where: DateWhereInput): Date
  views: Int!
}

"""A connection to a list of items."""
type VideoMetadataConnection {
  """Information to aid in pagination."""
  pageInfo: PageInfo!

  """A list of edges."""
  edges: [VideoMetadataEdge]!
  aggregate: AggregateVideoMetadata!
}

input VideoMetadataCreateInput {
  title: String
  subtitle: String
  advertisingEnabled: Boolean
  views: Int
  tags: TagCreateManyInput
  sources: SourceCreateManyInput
  dateRecorded: DateCreateOneInput
}

input VideoMetadataCreateOneInput {
  create: VideoMetadataCreateInput
}

"""An edge in a connection."""
type VideoMetadataEdge {
  """The item at the end of the edge."""
  node: VideoMetadata!

  """A cursor for use in pagination."""
  cursor: String!
}

enum VideoMetadataOrderByInput {
  title_ASC
  title_DESC
  subtitle_ASC
  subtitle_DESC
  advertisingEnabled_ASC
  advertisingEnabled_DESC
  views_ASC
  views_DESC
  id_ASC
  id_DESC
  updatedAt_ASC
  updatedAt_DESC
  createdAt_ASC
  createdAt_DESC
}

type VideoMetadataPreviousValues {
  title: String
  subtitle: String
  advertisingEnabled: Boolean!
  views: Int!
}

type VideoMetadataSubscriptionPayload {
  mutation: MutationType!
  node: VideoMetadata
  updatedFields: [String!]
  previousValues: VideoMetadataPreviousValues
}

input VideoMetadataSubscriptionWhereInput {
  """Logical AND on all given filters."""
  AND: [VideoMetadataSubscriptionWhereInput!]

  """Logical OR on all given filters."""
  OR: [VideoMetadataSubscriptionWhereInput!]

  """Logical NOT on all given filters combined by AND."""
  NOT: [VideoMetadataSubscriptionWhereInput!]

  """
  The subscription event gets dispatched when it's listed in mutation_in
  """
  mutation_in: [MutationType!]

  """
  The subscription event gets only dispatched when one of the updated fields names is included in this list
  """
  updatedFields_contains: String

  """
  The subscription event gets only dispatched when all of the field names included in this list have been updated
  """
  updatedFields_contains_every: [String!]

  """
  The subscription event gets only dispatched when some of the field names included in this list have been updated
  """
  updatedFields_contains_some: [String!]
  node: VideoMetadataWhereInput
}

input VideoMetadataUpdateDataInput {
  title: String
  subtitle: String
  advertisingEnabled: Boolean
  views: Int
  tags: TagUpdateManyInput
  sources: SourceUpdateManyInput
  dateRecorded: DateUpdateOneInput
}

input VideoMetadataUpdateInput {
  title: String
  subtitle: String
  advertisingEnabled: Boolean
  views: Int
  tags: TagUpdateManyInput
  sources: SourceUpdateManyInput
  dateRecorded: DateUpdateOneInput
}

input VideoMetadataUpdateOneInput {
  create: VideoMetadataCreateInput
  disconnect: Boolean
  delete: Boolean
  update: VideoMetadataUpdateDataInput
  upsert: VideoMetadataUpsertNestedInput
}

input VideoMetadataUpsertNestedInput {
  update: VideoMetadataUpdateDataInput!
  create: VideoMetadataCreateInput!
}

input VideoMetadataWhereInput {
  """Logical AND on all given filters."""
  AND: [VideoMetadataWhereInput!]

  """Logical OR on all given filters."""
  OR: [VideoMetadataWhereInput!]

  """Logical NOT on all given filters combined by AND."""
  NOT: [VideoMetadataWhereInput!]
  title: String

  """All values that are not equal to given value."""
  title_not: String

  """All values that are contained in given list."""
  title_in: [String!]

  """All values that are not contained in given list."""
  title_not_in: [String!]

  """All values less than the given value."""
  title_lt: String

  """All values less than or equal the given value."""
  title_lte: String

  """All values greater than the given value."""
  title_gt: String

  """All values greater than or equal the given value."""
  title_gte: String

  """All values containing the given string."""
  title_contains: String

  """All values not containing the given string."""
  title_not_contains: String

  """All values starting with the given string."""
  title_starts_with: String

  """All values not starting with the given string."""
  title_not_starts_with: String

  """All values ending with the given string."""
  title_ends_with: String

  """All values not ending with the given string."""
  title_not_ends_with: String
  subtitle: String

  """All values that are not equal to given value."""
  subtitle_not: String

  """All values that are contained in given list."""
  subtitle_in: [String!]

  """All values that are not contained in given list."""
  subtitle_not_in: [String!]

  """All values less than the given value."""
  subtitle_lt: String

  """All values less than or equal the given value."""
  subtitle_lte: String

  """All values greater than the given value."""
  subtitle_gt: String

  """All values greater than or equal the given value."""
  subtitle_gte: String

  """All values containing the given string."""
  subtitle_contains: String

  """All values not containing the given string."""
  subtitle_not_contains: String

  """All values starting with the given string."""
  subtitle_starts_with: String

  """All values not starting with the given string."""
  subtitle_not_starts_with: String

  """All values ending with the given string."""
  subtitle_ends_with: String

  """All values not ending with the given string."""
  subtitle_not_ends_with: String
  advertisingEnabled: Boolean

  """All values that are not equal to given value."""
  advertisingEnabled_not: Boolean
  views: Int

  """All values that are not equal to given value."""
  views_not: Int

  """All values that are contained in given list."""
  views_in: [Int!]

  """All values that are not contained in given list."""
  views_not_in: [Int!]

  """All values less than the given value."""
  views_lt: Int

  """All values less than or equal the given value."""
  views_lte: Int

  """All values greater than the given value."""
  views_gt: Int

  """All values greater than or equal the given value."""
  views_gte: Int
  tags_every: TagWhereInput
  tags_some: TagWhereInput
  tags_none: TagWhereInput
  sources_every: SourceWhereInput
  sources_some: SourceWhereInput
  sources_none: SourceWhereInput
  dateRecorded: DateWhereInput
  _MagicalBackRelation_VideoUploadMetadataRelation_every: VideoUploadWhereInput
  _MagicalBackRelation_VideoUploadMetadataRelation_some: VideoUploadWhereInput
  _MagicalBackRelation_VideoUploadMetadataRelation_none: VideoUploadWhereInput
}

enum VideoOrderByInput {
  id_ASC
  id_DESC
  published_ASC
  published_DESC
  advertisingEnabled_ASC
  advertisingEnabled_DESC
  views_ASC
  views_DESC
  updatedAt_ASC
  updatedAt_DESC
  createdAt_ASC
  createdAt_DESC
}

type VideoPreviousValues {
  id: ID!
  published: Boolean
  advertisingEnabled: Boolean
  views: Int
}

type VideoStorageLink implements Node {
  id: ID!
  videoID: ID!
  path: String!
  bucket: String!
  version: VideoVersion!
}

"""A connection to a list of items."""
type VideoStorageLinkConnection {
  """Information to aid in pagination."""
  pageInfo: PageInfo!

  """A list of edges."""
  edges: [VideoStorageLinkEdge]!
  aggregate: AggregateVideoStorageLink!
}

input VideoStorageLinkCreateInput {
  videoID: ID!
  path: String!
  bucket: String!
  version: VideoVersion!
}

input VideoStorageLinkCreateOneInput {
  create: VideoStorageLinkCreateInput
  connect: VideoStorageLinkWhereUniqueInput
}

"""An edge in a connection."""
type VideoStorageLinkEdge {
  """The item at the end of the edge."""
  node: VideoStorageLink!

  """A cursor for use in pagination."""
  cursor: String!
}

enum VideoStorageLinkOrderByInput {
  id_ASC
  id_DESC
  videoID_ASC
  videoID_DESC
  path_ASC
  path_DESC
  bucket_ASC
  bucket_DESC
  version_ASC
  version_DESC
  updatedAt_ASC
  updatedAt_DESC
  createdAt_ASC
  createdAt_DESC
}

type VideoStorageLinkPreviousValues {
  id: ID!
  videoID: ID!
  path: String!
  bucket: String!
  version: VideoVersion!
}

type VideoStorageLinkSubscriptionPayload {
  mutation: MutationType!
  node: VideoStorageLink
  updatedFields: [String!]
  previousValues: VideoStorageLinkPreviousValues
}

input VideoStorageLinkSubscriptionWhereInput {
  """Logical AND on all given filters."""
  AND: [VideoStorageLinkSubscriptionWhereInput!]

  """Logical OR on all given filters."""
  OR: [VideoStorageLinkSubscriptionWhereInput!]

  """Logical NOT on all given filters combined by AND."""
  NOT: [VideoStorageLinkSubscriptionWhereInput!]

  """
  The subscription event gets dispatched when it's listed in mutation_in
  """
  mutation_in: [MutationType!]

  """
  The subscription event gets only dispatched when one of the updated fields names is included in this list
  """
  updatedFields_contains: String

  """
  The subscription event gets only dispatched when all of the field names included in this list have been updated
  """
  updatedFields_contains_every: [String!]

  """
  The subscription event gets only dispatched when some of the field names included in this list have been updated
  """
  updatedFields_contains_some: [String!]
  node: VideoStorageLinkWhereInput
}

input VideoStorageLinkUpdateDataInput {
  videoID: ID
  path: String
  bucket: String
  version: VideoVersion
}

input VideoStorageLinkUpdateInput {
  videoID: ID
  path: String
  bucket: String
  version: VideoVersion
}

input VideoStorageLinkUpdateOneInput {
  create: VideoStorageLinkCreateInput
  connect: VideoStorageLinkWhereUniqueInput
  disconnect: Boolean
  delete: Boolean
  update: VideoStorageLinkUpdateDataInput
  upsert: VideoStorageLinkUpsertNestedInput
}

input VideoStorageLinkUpsertNestedInput {
  update: VideoStorageLinkUpdateDataInput!
  create: VideoStorageLinkCreateInput!
}

input VideoStorageLinkWhereInput {
  """Logical AND on all given filters."""
  AND: [VideoStorageLinkWhereInput!]

  """Logical OR on all given filters."""
  OR: [VideoStorageLinkWhereInput!]

  """Logical NOT on all given filters combined by AND."""
  NOT: [VideoStorageLinkWhereInput!]
  id: ID

  """All values that are not equal to given value."""
  id_not: ID

  """All values that are contained in given list."""
  id_in: [ID!]

  """All values that are not contained in given list."""
  id_not_in: [ID!]

  """All values less than the given value."""
  id_lt: ID

  """All values less than or equal the given value."""
  id_lte: ID

  """All values greater than the given value."""
  id_gt: ID

  """All values greater than or equal the given value."""
  id_gte: ID

  """All values containing the given string."""
  id_contains: ID

  """All values not containing the given string."""
  id_not_contains: ID

  """All values starting with the given string."""
  id_starts_with: ID

  """All values not starting with the given string."""
  id_not_starts_with: ID

  """All values ending with the given string."""
  id_ends_with: ID

  """All values not ending with the given string."""
  id_not_ends_with: ID
  videoID: ID

  """All values that are not equal to given value."""
  videoID_not: ID

  """All values that are contained in given list."""
  videoID_in: [ID!]

  """All values that are not contained in given list."""
  videoID_not_in: [ID!]

  """All values less than the given value."""
  videoID_lt: ID

  """All values less than or equal the given value."""
  videoID_lte: ID

  """All values greater than the given value."""
  videoID_gt: ID

  """All values greater than or equal the given value."""
  videoID_gte: ID

  """All values containing the given string."""
  videoID_contains: ID

  """All values not containing the given string."""
  videoID_not_contains: ID

  """All values starting with the given string."""
  videoID_starts_with: ID

  """All values not starting with the given string."""
  videoID_not_starts_with: ID

  """All values ending with the given string."""
  videoID_ends_with: ID

  """All values not ending with the given string."""
  videoID_not_ends_with: ID
  path: String

  """All values that are not equal to given value."""
  path_not: String

  """All values that are contained in given list."""
  path_in: [String!]

  """All values that are not contained in given list."""
  path_not_in: [String!]

  """All values less than the given value."""
  path_lt: String

  """All values less than or equal the given value."""
  path_lte: String

  """All values greater than the given value."""
  path_gt: String

  """All values greater than or equal the given value."""
  path_gte: String

  """All values containing the given string."""
  path_contains: String

  """All values not containing the given string."""
  path_not_contains: String

  """All values starting with the given string."""
  path_starts_with: String

  """All values not starting with the given string."""
  path_not_starts_with: String

  """All values ending with the given string."""
  path_ends_with: String

  """All values not ending with the given string."""
  path_not_ends_with: String
  bucket: String

  """All values that are not equal to given value."""
  bucket_not: String

  """All values that are contained in given list."""
  bucket_in: [String!]

  """All values that are not contained in given list."""
  bucket_not_in: [String!]

  """All values less than the given value."""
  bucket_lt: String

  """All values less than or equal the given value."""
  bucket_lte: String

  """All values greater than the given value."""
  bucket_gt: String

  """All values greater than or equal the given value."""
  bucket_gte: String

  """All values containing the given string."""
  bucket_contains: String

  """All values not containing the given string."""
  bucket_not_contains: String

  """All values starting with the given string."""
  bucket_starts_with: String

  """All values not starting with the given string."""
  bucket_not_starts_with: String

  """All values ending with the given string."""
  bucket_ends_with: String

  """All values not ending with the given string."""
  bucket_not_ends_with: String
  version: VideoVersion

  """All values that are not equal to given value."""
  version_not: VideoVersion

  """All values that are contained in given list."""
  version_in: [VideoVersion!]

  """All values that are not contained in given list."""
  version_not_in: [VideoVersion!]
  _MagicalBackRelation_VideoMp4LinkRelation_every: VideoUploadWhereInput
  _MagicalBackRelation_VideoMp4LinkRelation_some: VideoUploadWhereInput
  _MagicalBackRelation_VideoMp4LinkRelation_none: VideoUploadWhereInput
  _MagicalBackRelation_VideoFlacLinkRelation_every: VideoUploadWhereInput
  _MagicalBackRelation_VideoFlacLinkRelation_some: VideoUploadWhereInput
  _MagicalBackRelation_VideoFlacLinkRelation_none: VideoUploadWhereInput
  _MagicalBackRelation_VideoStorageRawRelation_every: VideoUploadWhereInput
  _MagicalBackRelation_VideoStorageRawRelation_some: VideoUploadWhereInput
  _MagicalBackRelation_VideoStorageRawRelation_none: VideoUploadWhereInput
  _MagicalBackRelation_VideoWebmLinkRelation_every: VideoUploadWhereInput
  _MagicalBackRelation_VideoWebmLinkRelation_some: VideoUploadWhereInput
  _MagicalBackRelation_VideoWebmLinkRelation_none: VideoUploadWhereInput
}

input VideoStorageLinkWhereUniqueInput {
  id: ID
}

type VideoSubscriptionPayload {
  mutation: MutationType!
  node: Video
  updatedFields: [String!]
  previousValues: VideoPreviousValues
}

input VideoSubscriptionWhereInput {
  """Logical AND on all given filters."""
  AND: [VideoSubscriptionWhereInput!]

  """Logical OR on all given filters."""
  OR: [VideoSubscriptionWhereInput!]

  """Logical NOT on all given filters combined by AND."""
  NOT: [VideoSubscriptionWhereInput!]

  """
  The subscription event gets dispatched when it's listed in mutation_in
  """
  mutation_in: [MutationType!]

  """
  The subscription event gets only dispatched when one of the updated fields names is included in this list
  """
  updatedFields_contains: String

  """
  The subscription event gets only dispatched when all of the field names included in this list have been updated
  """
  updatedFields_contains_every: [String!]

  """
  The subscription event gets only dispatched when some of the field names included in this list have been updated
  """
  updatedFields_contains_some: [String!]
  node: VideoWhereInput
}

input VideoUpdateDataInput {
  published: Boolean
  advertisingEnabled: Boolean
  views: Int
}

input VideoUpdateInput {
  published: Boolean
  advertisingEnabled: Boolean
  views: Int
}

input VideoUpdateManyInput {
  create: [VideoCreateInput!]
  connect: [VideoWhereUniqueInput!]
  disconnect: [VideoWhereUniqueInput!]
  delete: [VideoWhereUniqueInput!]
  update: [VideoUpdateWithWhereUniqueNestedInput!]
  upsert: [VideoUpsertWithWhereUniqueNestedInput!]
}

input VideoUpdateOneInput {
  create: VideoCreateInput
  connect: VideoWhereUniqueInput
  disconnect: Boolean
  delete: Boolean
  update: VideoUpdateDataInput
  upsert: VideoUpsertNestedInput
}

input VideoUpdateWithWhereUniqueNestedInput {
  where: VideoWhereUniqueInput!
  data: VideoUpdateDataInput!
}

type VideoUpload implements Node {
  id: ID!
  createdAt: DateTime!
  updatedAt: DateTime!
  submitedBy(where: UserWhereInput): User!
  publishedBy(where: UserWhereInput): User
  publishedVideo(where: VideoWhereInput): Video
  submitedUrl: String!
  status: VideoUploadStatus!
  state: VideoUploadState!
  published: Boolean!
  rawStorageLink(where: VideoStorageLinkWhereInput): VideoStorageLink
  webmLink(where: VideoStorageLinkWhereInput): VideoStorageLink
  mp4Link(where: VideoStorageLinkWhereInput): VideoStorageLink
  flacLink(where: VideoStorageLinkWhereInput): VideoStorageLink
  metadata(where: VideoMetadataWhereInput): VideoMetadata
  thumbnail(where: ThumbnailWhereInput): Thumbnail
  generatedConversation(where: SpeechAPIConversationWhereInput): SpeechAPIConversation
}

"""A connection to a list of items."""
type VideoUploadConnection {
  """Information to aid in pagination."""
  pageInfo: PageInfo!

  """A list of edges."""
  edges: [VideoUploadEdge]!
  aggregate: AggregateVideoUpload!
}

input VideoUploadCreateInput {
  submitedUrl: String!
  status: VideoUploadStatus!
  state: VideoUploadState
  published: Boolean
  submitedBy: UserCreateOneInput!
  publishedBy: UserCreateOneInput
  publishedVideo: VideoCreateOneInput
  rawStorageLink: VideoStorageLinkCreateOneInput
  webmLink: VideoStorageLinkCreateOneInput
  mp4Link: VideoStorageLinkCreateOneInput
  flacLink: VideoStorageLinkCreateOneInput
  metadata: VideoMetadataCreateOneInput
  thumbnail: ThumbnailCreateOneInput
  generatedConversation: SpeechAPIConversationCreateOneWithoutVideoUploadInput
}

input VideoUploadCreateOneInput {
  create: VideoUploadCreateInput
  connect: VideoUploadWhereUniqueInput
}

input VideoUploadCreateOneWithoutGeneratedConversationInput {
  create: VideoUploadCreateWithoutGeneratedConversationInput
  connect: VideoUploadWhereUniqueInput
}

input VideoUploadCreateWithoutGeneratedConversationInput {
  submitedUrl: String!
  status: VideoUploadStatus!
  state: VideoUploadState
  published: Boolean
  submitedBy: UserCreateOneInput!
  publishedBy: UserCreateOneInput
  publishedVideo: VideoCreateOneInput
  rawStorageLink: VideoStorageLinkCreateOneInput
  webmLink: VideoStorageLinkCreateOneInput
  mp4Link: VideoStorageLinkCreateOneInput
  flacLink: VideoStorageLinkCreateOneInput
  metadata: VideoMetadataCreateOneInput
  thumbnail: ThumbnailCreateOneInput
}

"""An edge in a connection."""
type VideoUploadEdge {
  """The item at the end of the edge."""
  node: VideoUpload!

  """A cursor for use in pagination."""
  cursor: String!
}

enum VideoUploadOrderByInput {
  id_ASC
  id_DESC
  createdAt_ASC
  createdAt_DESC
  updatedAt_ASC
  updatedAt_DESC
  submitedUrl_ASC
  submitedUrl_DESC
  status_ASC
  status_DESC
  state_ASC
  state_DESC
  published_ASC
  published_DESC
}

type VideoUploadPreviousValues {
  id: ID!
  createdAt: DateTime!
  updatedAt: DateTime!
  submitedUrl: String!
  status: VideoUploadStatus!
  state: VideoUploadState!
  published: Boolean!
}

enum VideoUploadState {
  PENDING
  PROCESSING
  REJECTED
  FAILED
  PUBLISHED
}

enum VideoUploadStatus {
  AWAITING_PROCESSING
  DOWNLOADING
  READY_TO_RENDER
  RENDERING
  NEEDS_THUMBNAILS
  GENERATING_THUMBNAILS
  NEEDS_REVIEW
  AWAITING_TRANSCRIPTION
  NEEDS_METADATA
  READY_TO_PUBLISH
}

type VideoUploadSubscriptionPayload {
  mutation: MutationType!
  node: VideoUpload
  updatedFields: [String!]
  previousValues: VideoUploadPreviousValues
}

input VideoUploadSubscriptionWhereInput {
  """Logical AND on all given filters."""
  AND: [VideoUploadSubscriptionWhereInput!]

  """Logical OR on all given filters."""
  OR: [VideoUploadSubscriptionWhereInput!]

  """Logical NOT on all given filters combined by AND."""
  NOT: [VideoUploadSubscriptionWhereInput!]

  """
  The subscription event gets dispatched when it's listed in mutation_in
  """
  mutation_in: [MutationType!]

  """
  The subscription event gets only dispatched when one of the updated fields names is included in this list
  """
  updatedFields_contains: String

  """
  The subscription event gets only dispatched when all of the field names included in this list have been updated
  """
  updatedFields_contains_every: [String!]

  """
  The subscription event gets only dispatched when some of the field names included in this list have been updated
  """
  updatedFields_contains_some: [String!]
  node: VideoUploadWhereInput
}

input VideoUploadUpdateDataInput {
  submitedUrl: String
  status: VideoUploadStatus
  state: VideoUploadState
  published: Boolean
  submitedBy: UserUpdateOneInput
  publishedBy: UserUpdateOneInput
  publishedVideo: VideoUpdateOneInput
  rawStorageLink: VideoStorageLinkUpdateOneInput
  webmLink: VideoStorageLinkUpdateOneInput
  mp4Link: VideoStorageLinkUpdateOneInput
  flacLink: VideoStorageLinkUpdateOneInput
  metadata: VideoMetadataUpdateOneInput
  thumbnail: ThumbnailUpdateOneInput
  generatedConversation: SpeechAPIConversationUpdateOneWithoutVideoUploadInput
}

input VideoUploadUpdateInput {
  submitedUrl: String
  status: VideoUploadStatus
  state: VideoUploadState
  published: Boolean
  submitedBy: UserUpdateOneInput
  publishedBy: UserUpdateOneInput
  publishedVideo: VideoUpdateOneInput
  rawStorageLink: VideoStorageLinkUpdateOneInput
  webmLink: VideoStorageLinkUpdateOneInput
  mp4Link: VideoStorageLinkUpdateOneInput
  flacLink: VideoStorageLinkUpdateOneInput
  metadata: VideoMetadataUpdateOneInput
  thumbnail: ThumbnailUpdateOneInput
  generatedConversation: SpeechAPIConversationUpdateOneWithoutVideoUploadInput
}

input VideoUploadUpdateOneInput {
  create: VideoUploadCreateInput
  connect: VideoUploadWhereUniqueInput
  delete: Boolean
  update: VideoUploadUpdateDataInput
  upsert: VideoUploadUpsertNestedInput
}

input VideoUploadUpdateOneWithoutGeneratedConversationInput {
  create: VideoUploadCreateWithoutGeneratedConversationInput
  connect: VideoUploadWhereUniqueInput
  delete: Boolean
  update: VideoUploadUpdateWithoutGeneratedConversationDataInput
  upsert: VideoUploadUpsertWithoutGeneratedConversationInput
}

input VideoUploadUpdateWithoutGeneratedConversationDataInput {
  submitedUrl: String
  status: VideoUploadStatus
  state: VideoUploadState
  published: Boolean
  submitedBy: UserUpdateOneInput
  publishedBy: UserUpdateOneInput
  publishedVideo: VideoUpdateOneInput
  rawStorageLink: VideoStorageLinkUpdateOneInput
  webmLink: VideoStorageLinkUpdateOneInput
  mp4Link: VideoStorageLinkUpdateOneInput
  flacLink: VideoStorageLinkUpdateOneInput
  metadata: VideoMetadataUpdateOneInput
  thumbnail: ThumbnailUpdateOneInput
}

input VideoUploadUpsertNestedInput {
  update: VideoUploadUpdateDataInput!
  create: VideoUploadCreateInput!
}

input VideoUploadUpsertWithoutGeneratedConversationInput {
  update: VideoUploadUpdateWithoutGeneratedConversationDataInput!
  create: VideoUploadCreateWithoutGeneratedConversationInput!
}

input VideoUploadWhereInput {
  """Logical AND on all given filters."""
  AND: [VideoUploadWhereInput!]

  """Logical OR on all given filters."""
  OR: [VideoUploadWhereInput!]

  """Logical NOT on all given filters combined by AND."""
  NOT: [VideoUploadWhereInput!]
  id: ID

  """All values that are not equal to given value."""
  id_not: ID

  """All values that are contained in given list."""
  id_in: [ID!]

  """All values that are not contained in given list."""
  id_not_in: [ID!]

  """All values less than the given value."""
  id_lt: ID

  """All values less than or equal the given value."""
  id_lte: ID

  """All values greater than the given value."""
  id_gt: ID

  """All values greater than or equal the given value."""
  id_gte: ID

  """All values containing the given string."""
  id_contains: ID

  """All values not containing the given string."""
  id_not_contains: ID

  """All values starting with the given string."""
  id_starts_with: ID

  """All values not starting with the given string."""
  id_not_starts_with: ID

  """All values ending with the given string."""
  id_ends_with: ID

  """All values not ending with the given string."""
  id_not_ends_with: ID
  createdAt: DateTime

  """All values that are not equal to given value."""
  createdAt_not: DateTime

  """All values that are contained in given list."""
  createdAt_in: [DateTime!]

  """All values that are not contained in given list."""
  createdAt_not_in: [DateTime!]

  """All values less than the given value."""
  createdAt_lt: DateTime

  """All values less than or equal the given value."""
  createdAt_lte: DateTime

  """All values greater than the given value."""
  createdAt_gt: DateTime

  """All values greater than or equal the given value."""
  createdAt_gte: DateTime
  updatedAt: DateTime

  """All values that are not equal to given value."""
  updatedAt_not: DateTime

  """All values that are contained in given list."""
  updatedAt_in: [DateTime!]

  """All values that are not contained in given list."""
  updatedAt_not_in: [DateTime!]

  """All values less than the given value."""
  updatedAt_lt: DateTime

  """All values less than or equal the given value."""
  updatedAt_lte: DateTime

  """All values greater than the given value."""
  updatedAt_gt: DateTime

  """All values greater than or equal the given value."""
  updatedAt_gte: DateTime
  submitedUrl: String

  """All values that are not equal to given value."""
  submitedUrl_not: String

  """All values that are contained in given list."""
  submitedUrl_in: [String!]

  """All values that are not contained in given list."""
  submitedUrl_not_in: [String!]

  """All values less than the given value."""
  submitedUrl_lt: String

  """All values less than or equal the given value."""
  submitedUrl_lte: String

  """All values greater than the given value."""
  submitedUrl_gt: String

  """All values greater than or equal the given value."""
  submitedUrl_gte: String

  """All values containing the given string."""
  submitedUrl_contains: String

  """All values not containing the given string."""
  submitedUrl_not_contains: String

  """All values starting with the given string."""
  submitedUrl_starts_with: String

  """All values not starting with the given string."""
  submitedUrl_not_starts_with: String

  """All values ending with the given string."""
  submitedUrl_ends_with: String

  """All values not ending with the given string."""
  submitedUrl_not_ends_with: String
  status: VideoUploadStatus

  """All values that are not equal to given value."""
  status_not: VideoUploadStatus

  """All values that are contained in given list."""
  status_in: [VideoUploadStatus!]

  """All values that are not contained in given list."""
  status_not_in: [VideoUploadStatus!]
  state: VideoUploadState

  """All values that are not equal to given value."""
  state_not: VideoUploadState

  """All values that are contained in given list."""
  state_in: [VideoUploadState!]

  """All values that are not contained in given list."""
  state_not_in: [VideoUploadState!]
  published: Boolean

  """All values that are not equal to given value."""
  published_not: Boolean
  submitedBy: UserWhereInput
  publishedBy: UserWhereInput
  publishedVideo: VideoWhereInput
  rawStorageLink: VideoStorageLinkWhereInput
  webmLink: VideoStorageLinkWhereInput
  mp4Link: VideoStorageLinkWhereInput
  flacLink: VideoStorageLinkWhereInput
  metadata: VideoMetadataWhereInput
  thumbnail: ThumbnailWhereInput
  generatedConversation: SpeechAPIConversationWhereInput
  _MagicalBackRelation_SpeechAPIWordVideoRelation_every: SpeechAPIWordWhereInput
  _MagicalBackRelation_SpeechAPIWordVideoRelation_some: SpeechAPIWordWhereInput
  _MagicalBackRelation_SpeechAPIWordVideoRelation_none: SpeechAPIWordWhereInput
  _MagicalBackRelation_SpeechAPIConversationBlockVideoRelation_every: SpeechAPIConversationBlockWhereInput
  _MagicalBackRelation_SpeechAPIConversationBlockVideoRelation_some: SpeechAPIConversationBlockWhereInput
  _MagicalBackRelation_SpeechAPIConversationBlockVideoRelation_none: SpeechAPIConversationBlockWhereInput
}

input VideoUploadWhereUniqueInput {
  id: ID
  submitedUrl: String
}

input VideoUpsertNestedInput {
  update: VideoUpdateDataInput!
  create: VideoCreateInput!
}

input VideoUpsertWithWhereUniqueNestedInput {
  where: VideoWhereUniqueInput!
  update: VideoUpdateDataInput!
  create: VideoCreateInput!
}

enum VideoVersion {
  RAW
  WEBM
  MP4
  FLAC
}

input VideoWhereInput {
  """Logical AND on all given filters."""
  AND: [VideoWhereInput!]

  """Logical OR on all given filters."""
  OR: [VideoWhereInput!]

  """Logical NOT on all given filters combined by AND."""
  NOT: [VideoWhereInput!]
  id: ID

  """All values that are not equal to given value."""
  id_not: ID

  """All values that are contained in given list."""
  id_in: [ID!]

  """All values that are not contained in given list."""
  id_not_in: [ID!]

  """All values less than the given value."""
  id_lt: ID

  """All values less than or equal the given value."""
  id_lte: ID

  """All values greater than the given value."""
  id_gt: ID

  """All values greater than or equal the given value."""
  id_gte: ID

  """All values containing the given string."""
  id_contains: ID

  """All values not containing the given string."""
  id_not_contains: ID

  """All values starting with the given string."""
  id_starts_with: ID

  """All values not starting with the given string."""
  id_not_starts_with: ID

  """All values ending with the given string."""
  id_ends_with: ID

  """All values not ending with the given string."""
  id_not_ends_with: ID
  published: Boolean

  """All values that are not equal to given value."""
  published_not: Boolean
  advertisingEnabled: Boolean

  """All values that are not equal to given value."""
  advertisingEnabled_not: Boolean
  views: Int

  """All values that are not equal to given value."""
  views_not: Int

  """All values that are contained in given list."""
  views_in: [Int!]

  """All values that are not contained in given list."""
  views_not_in: [Int!]

  """All values less than the given value."""
  views_lt: Int

  """All values less than or equal the given value."""
  views_lte: Int

  """All values greater than the given value."""
  views_gt: Int

  """All values greater than or equal the given value."""
  views_gte: Int
  _MagicalBackRelation_SourceToVideo_every: SourceWhereInput
  _MagicalBackRelation_SourceToVideo_some: SourceWhereInput
  _MagicalBackRelation_SourceToVideo_none: SourceWhereInput
  _MagicalBackRelation_TagToVideo_every: TagWhereInput
  _MagicalBackRelation_TagToVideo_some: TagWhereInput
  _MagicalBackRelation_TagToVideo_none: TagWhereInput
  _MagicalBackRelation_VideoToVideoUpload_every: VideoUploadWhereInput
  _MagicalBackRelation_VideoToVideoUpload_some: VideoUploadWhereInput
  _MagicalBackRelation_VideoToVideoUpload_none: VideoUploadWhereInput
}

input VideoWhereUniqueInput {
  id: ID
}
`

export const Prisma = makePrismaBindingClass<BindingConstructor<Prisma>>({typeDefs})

/**
 * Types
*/

export type DateOrderByInput =   'month_ASC' |
  'month_DESC' |
  'day_ASC' |
  'day_DESC' |
  'year_ASC' |
  'year_DESC' |
  'id_ASC' |
  'id_DESC' |
  'updatedAt_ASC' |
  'updatedAt_DESC' |
  'createdAt_ASC' |
  'createdAt_DESC'

export type VideoVersion =   'RAW' |
  'WEBM' |
  'MP4' |
  'FLAC'

export type PublicationOrderByInput =   'avatarPath_ASC' |
  'avatarPath_DESC' |
  'name_ASC' |
  'name_DESC' |
  'id_ASC' |
  'id_DESC' |
  'updatedAt_ASC' |
  'updatedAt_DESC' |
  'createdAt_ASC' |
  'createdAt_DESC'

export type MutationType =   'CREATED' |
  'UPDATED' |
  'DELETED'

export type Role =   'USER' |
  'ADMIN'

export type VideoUploadOrderByInput =   'id_ASC' |
  'id_DESC' |
  'createdAt_ASC' |
  'createdAt_DESC' |
  'updatedAt_ASC' |
  'updatedAt_DESC' |
  'submitedUrl_ASC' |
  'submitedUrl_DESC' |
  'status_ASC' |
  'status_DESC' |
  'state_ASC' |
  'state_DESC' |
  'published_ASC' |
  'published_DESC'

export type SpeechAPIWordOrderByInput =   'id_ASC' |
  'id_DESC' |
  'startTime_ASC' |
  'startTime_DESC' |
  'endTime_ASC' |
  'endTime_DESC' |
  'word_ASC' |
  'word_DESC' |
  'speakerTag_ASC' |
  'speakerTag_DESC' |
  'updatedAt_ASC' |
  'updatedAt_DESC' |
  'createdAt_ASC' |
  'createdAt_DESC'

export type UserOrderByInput =   'id_ASC' |
  'id_DESC' |
  'email_ASC' |
  'email_DESC' |
  'auth0Id_ASC' |
  'auth0Id_DESC' |
  'role_ASC' |
  'role_DESC' |
  'displayName_ASC' |
  'displayName_DESC' |
  'avatar_ASC' |
  'avatar_DESC' |
  'givenName_ASC' |
  'givenName_DESC' |
  'familyName_ASC' |
  'familyName_DESC' |
  'updatedAt_ASC' |
  'updatedAt_DESC' |
  'createdAt_ASC' |
  'createdAt_DESC'

export type SpeechAPIConversationBlockOrderByInput =   'id_ASC' |
  'id_DESC' |
  'speakerTag_ASC' |
  'speakerTag_DESC' |
  'updatedAt_ASC' |
  'updatedAt_DESC' |
  'createdAt_ASC' |
  'createdAt_DESC'

export type VideoUploadStatus =   'AWAITING_PROCESSING' |
  'DOWNLOADING' |
  'READY_TO_RENDER' |
  'RENDERING' |
  'NEEDS_THUMBNAILS' |
  'GENERATING_THUMBNAILS' |
  'NEEDS_REVIEW' |
  'AWAITING_TRANSCRIPTION' |
  'NEEDS_METADATA' |
  'READY_TO_PUBLISH'

export type SourceOrderByInput =   'url_ASC' |
  'url_DESC' |
  'title_ASC' |
  'title_DESC' |
  'priority_ASC' |
  'priority_DESC' |
  'id_ASC' |
  'id_DESC' |
  'updatedAt_ASC' |
  'updatedAt_DESC' |
  'createdAt_ASC' |
  'createdAt_DESC'

export type SpeakerOrderByInput =   'name_ASC' |
  'name_DESC' |
  'avatarPath_ASC' |
  'avatarPath_DESC' |
  'title_ASC' |
  'title_DESC' |
  'id_ASC' |
  'id_DESC' |
  'updatedAt_ASC' |
  'updatedAt_DESC' |
  'createdAt_ASC' |
  'createdAt_DESC'

export type SpeechAPIConversationOrderByInput =   'id_ASC' |
  'id_DESC' |
  'updatedAt_ASC' |
  'updatedAt_DESC' |
  'createdAt_ASC' |
  'createdAt_DESC'

export type AdminRole =   'CREATE_UPLOAD' |
  'LIST_UPLOADS' |
  'LIST_ALL_UPLOADS' |
  'ADVANCE_UPLOADS' |
  'PUBLISH_UPLOAD' |
  'DELETE_UPLOADS'

export type TagOrderByInput =   'id_ASC' |
  'id_DESC' |
  'name_ASC' |
  'name_DESC' |
  'updatedAt_ASC' |
  'updatedAt_DESC' |
  'createdAt_ASC' |
  'createdAt_DESC'

export type VideoOrderByInput =   'id_ASC' |
  'id_DESC' |
  'published_ASC' |
  'published_DESC' |
  'advertisingEnabled_ASC' |
  'advertisingEnabled_DESC' |
  'views_ASC' |
  'views_DESC' |
  'updatedAt_ASC' |
  'updatedAt_DESC' |
  'createdAt_ASC' |
  'createdAt_DESC'

export type VideoStorageLinkOrderByInput =   'id_ASC' |
  'id_DESC' |
  'videoID_ASC' |
  'videoID_DESC' |
  'path_ASC' |
  'path_DESC' |
  'bucket_ASC' |
  'bucket_DESC' |
  'version_ASC' |
  'version_DESC' |
  'updatedAt_ASC' |
  'updatedAt_DESC' |
  'createdAt_ASC' |
  'createdAt_DESC'

export type VideoUploadState =   'PENDING' |
  'PROCESSING' |
  'REJECTED' |
  'FAILED' |
  'PUBLISHED'

export type ThumbnailOrderByInput =   'id_ASC' |
  'id_DESC' |
  'videoID_ASC' |
  'videoID_DESC' |
  'path_ASC' |
  'path_DESC' |
  'bucket_ASC' |
  'bucket_DESC' |
  'updatedAt_ASC' |
  'updatedAt_DESC' |
  'createdAt_ASC' |
  'createdAt_DESC'

export type VideoMetadataOrderByInput =   'title_ASC' |
  'title_DESC' |
  'subtitle_ASC' |
  'subtitle_DESC' |
  'advertisingEnabled_ASC' |
  'advertisingEnabled_DESC' |
  'views_ASC' |
  'views_DESC' |
  'id_ASC' |
  'id_DESC' |
  'updatedAt_ASC' |
  'updatedAt_DESC' |
  'createdAt_ASC' |
  'createdAt_DESC'

export interface SourceCreateManyInput {
  create?: SourceCreateInput[] | SourceCreateInput
}

export interface SpeakerWhereInput {
  AND?: SpeakerWhereInput[] | SpeakerWhereInput
  OR?: SpeakerWhereInput[] | SpeakerWhereInput
  NOT?: SpeakerWhereInput[] | SpeakerWhereInput
  name?: String
  name_not?: String
  name_in?: String[] | String
  name_not_in?: String[] | String
  name_lt?: String
  name_lte?: String
  name_gt?: String
  name_gte?: String
  name_contains?: String
  name_not_contains?: String
  name_starts_with?: String
  name_not_starts_with?: String
  name_ends_with?: String
  name_not_ends_with?: String
  avatarPath?: String
  avatarPath_not?: String
  avatarPath_in?: String[] | String
  avatarPath_not_in?: String[] | String
  avatarPath_lt?: String
  avatarPath_lte?: String
  avatarPath_gt?: String
  avatarPath_gte?: String
  avatarPath_contains?: String
  avatarPath_not_contains?: String
  avatarPath_starts_with?: String
  avatarPath_not_starts_with?: String
  avatarPath_ends_with?: String
  avatarPath_not_ends_with?: String
  title?: String
  title_not?: String
  title_in?: String[] | String
  title_not_in?: String[] | String
  title_lt?: String
  title_lte?: String
  title_gt?: String
  title_gte?: String
  title_contains?: String
  title_not_contains?: String
  title_starts_with?: String
  title_not_starts_with?: String
  title_ends_with?: String
  title_not_ends_with?: String
}

export interface SpeechAPIWordCreateInput {
  startTime: Int
  endTime: Int
  word: String
  speakerTag: Int
  videoUpload: VideoUploadCreateOneInput
}

export interface ThumbnailWhereInput {
  AND?: ThumbnailWhereInput[] | ThumbnailWhereInput
  OR?: ThumbnailWhereInput[] | ThumbnailWhereInput
  NOT?: ThumbnailWhereInput[] | ThumbnailWhereInput
  id?: ID_Input
  id_not?: ID_Input
  id_in?: ID_Input[] | ID_Input
  id_not_in?: ID_Input[] | ID_Input
  id_lt?: ID_Input
  id_lte?: ID_Input
  id_gt?: ID_Input
  id_gte?: ID_Input
  id_contains?: ID_Input
  id_not_contains?: ID_Input
  id_starts_with?: ID_Input
  id_not_starts_with?: ID_Input
  id_ends_with?: ID_Input
  id_not_ends_with?: ID_Input
  videoID?: ID_Input
  videoID_not?: ID_Input
  videoID_in?: ID_Input[] | ID_Input
  videoID_not_in?: ID_Input[] | ID_Input
  videoID_lt?: ID_Input
  videoID_lte?: ID_Input
  videoID_gt?: ID_Input
  videoID_gte?: ID_Input
  videoID_contains?: ID_Input
  videoID_not_contains?: ID_Input
  videoID_starts_with?: ID_Input
  videoID_not_starts_with?: ID_Input
  videoID_ends_with?: ID_Input
  videoID_not_ends_with?: ID_Input
  path?: String
  path_not?: String
  path_in?: String[] | String
  path_not_in?: String[] | String
  path_lt?: String
  path_lte?: String
  path_gt?: String
  path_gte?: String
  path_contains?: String
  path_not_contains?: String
  path_starts_with?: String
  path_not_starts_with?: String
  path_ends_with?: String
  path_not_ends_with?: String
  bucket?: String
  bucket_not?: String
  bucket_in?: String[] | String
  bucket_not_in?: String[] | String
  bucket_lt?: String
  bucket_lte?: String
  bucket_gt?: String
  bucket_gte?: String
  bucket_contains?: String
  bucket_not_contains?: String
  bucket_starts_with?: String
  bucket_not_starts_with?: String
  bucket_ends_with?: String
  bucket_not_ends_with?: String
  _MagicalBackRelation_VideoUploadThumbnailRelation_every?: VideoUploadWhereInput
  _MagicalBackRelation_VideoUploadThumbnailRelation_some?: VideoUploadWhereInput
  _MagicalBackRelation_VideoUploadThumbnailRelation_none?: VideoUploadWhereInput
}

export interface VideoUploadCreateOneInput {
  create?: VideoUploadCreateInput
  connect?: VideoUploadWhereUniqueInput
}

export interface SpeechAPIConversationBlockWhereInput {
  AND?: SpeechAPIConversationBlockWhereInput[] | SpeechAPIConversationBlockWhereInput
  OR?: SpeechAPIConversationBlockWhereInput[] | SpeechAPIConversationBlockWhereInput
  NOT?: SpeechAPIConversationBlockWhereInput[] | SpeechAPIConversationBlockWhereInput
  id?: ID_Input
  id_not?: ID_Input
  id_in?: ID_Input[] | ID_Input
  id_not_in?: ID_Input[] | ID_Input
  id_lt?: ID_Input
  id_lte?: ID_Input
  id_gt?: ID_Input
  id_gte?: ID_Input
  id_contains?: ID_Input
  id_not_contains?: ID_Input
  id_starts_with?: ID_Input
  id_not_starts_with?: ID_Input
  id_ends_with?: ID_Input
  id_not_ends_with?: ID_Input
  speakerTag?: Int
  speakerTag_not?: Int
  speakerTag_in?: Int[] | Int
  speakerTag_not_in?: Int[] | Int
  speakerTag_lt?: Int
  speakerTag_lte?: Int
  speakerTag_gt?: Int
  speakerTag_gte?: Int
  words_every?: SpeechAPIWordWhereInput
  words_some?: SpeechAPIWordWhereInput
  words_none?: SpeechAPIWordWhereInput
  videoUpload?: VideoUploadWhereInput
  _MagicalBackRelation_SpeechAPIConversationToSpeechAPIConversationBlock_every?: SpeechAPIConversationWhereInput
  _MagicalBackRelation_SpeechAPIConversationToSpeechAPIConversationBlock_some?: SpeechAPIConversationWhereInput
  _MagicalBackRelation_SpeechAPIConversationToSpeechAPIConversationBlock_none?: SpeechAPIConversationWhereInput
}

export interface VideoUploadUpsertWithoutGeneratedConversationInput {
  update: VideoUploadUpdateWithoutGeneratedConversationDataInput
  create: VideoUploadCreateWithoutGeneratedConversationInput
}

export interface VideoMetadataUpdateOneInput {
  create?: VideoMetadataCreateInput
  disconnect?: Boolean
  delete?: Boolean
  update?: VideoMetadataUpdateDataInput
  upsert?: VideoMetadataUpsertNestedInput
}

export interface ThumbnailUpsertNestedInput {
  update: ThumbnailUpdateDataInput
  create: ThumbnailCreateInput
}

export interface VideoUploadCreateInput {
  submitedUrl: String
  status: VideoUploadStatus
  state?: VideoUploadState
  published?: Boolean
  submitedBy: UserCreateOneInput
  publishedBy?: UserCreateOneInput
  publishedVideo?: VideoCreateOneInput
  rawStorageLink?: VideoStorageLinkCreateOneInput
  webmLink?: VideoStorageLinkCreateOneInput
  mp4Link?: VideoStorageLinkCreateOneInput
  flacLink?: VideoStorageLinkCreateOneInput
  metadata?: VideoMetadataCreateOneInput
  thumbnail?: ThumbnailCreateOneInput
  generatedConversation?: SpeechAPIConversationCreateOneWithoutVideoUploadInput
}

export interface ThumbnailUpdateDataInput {
  videoID?: ID_Input
  path?: String
  bucket?: String
}

export interface VideoStorageLinkSubscriptionWhereInput {
  AND?: VideoStorageLinkSubscriptionWhereInput[] | VideoStorageLinkSubscriptionWhereInput
  OR?: VideoStorageLinkSubscriptionWhereInput[] | VideoStorageLinkSubscriptionWhereInput
  NOT?: VideoStorageLinkSubscriptionWhereInput[] | VideoStorageLinkSubscriptionWhereInput
  mutation_in?: MutationType[] | MutationType
  updatedFields_contains?: String
  updatedFields_contains_every?: String[] | String
  updatedFields_contains_some?: String[] | String
  node?: VideoStorageLinkWhereInput
}

export interface ThumbnailUpdateOneInput {
  create?: ThumbnailCreateInput
  connect?: ThumbnailWhereUniqueInput
  disconnect?: Boolean
  delete?: Boolean
  update?: ThumbnailUpdateDataInput
  upsert?: ThumbnailUpsertNestedInput
}

export interface TagSubscriptionWhereInput {
  AND?: TagSubscriptionWhereInput[] | TagSubscriptionWhereInput
  OR?: TagSubscriptionWhereInput[] | TagSubscriptionWhereInput
  NOT?: TagSubscriptionWhereInput[] | TagSubscriptionWhereInput
  mutation_in?: MutationType[] | MutationType
  updatedFields_contains?: String
  updatedFields_contains_every?: String[] | String
  updatedFields_contains_some?: String[] | String
  node?: TagWhereInput
}

export interface VideoMetadataUpsertNestedInput {
  update: VideoMetadataUpdateDataInput
  create: VideoMetadataCreateInput
}

export interface SpeechAPIConversationBlockSubscriptionWhereInput {
  AND?: SpeechAPIConversationBlockSubscriptionWhereInput[] | SpeechAPIConversationBlockSubscriptionWhereInput
  OR?: SpeechAPIConversationBlockSubscriptionWhereInput[] | SpeechAPIConversationBlockSubscriptionWhereInput
  NOT?: SpeechAPIConversationBlockSubscriptionWhereInput[] | SpeechAPIConversationBlockSubscriptionWhereInput
  mutation_in?: MutationType[] | MutationType
  updatedFields_contains?: String
  updatedFields_contains_every?: String[] | String
  updatedFields_contains_some?: String[] | String
  node?: SpeechAPIConversationBlockWhereInput
}

export interface DateUpsertNestedInput {
  update: DateUpdateDataInput
  create: DateCreateInput
}

export interface SpeechAPIWordSubscriptionWhereInput {
  AND?: SpeechAPIWordSubscriptionWhereInput[] | SpeechAPIWordSubscriptionWhereInput
  OR?: SpeechAPIWordSubscriptionWhereInput[] | SpeechAPIWordSubscriptionWhereInput
  NOT?: SpeechAPIWordSubscriptionWhereInput[] | SpeechAPIWordSubscriptionWhereInput
  mutation_in?: MutationType[] | MutationType
  updatedFields_contains?: String
  updatedFields_contains_every?: String[] | String
  updatedFields_contains_some?: String[] | String
  node?: SpeechAPIWordWhereInput
}

export interface DateUpdateDataInput {
  month?: Int
  day?: Int
  year?: Int
}

export interface PublicationWhereInput {
  AND?: PublicationWhereInput[] | PublicationWhereInput
  OR?: PublicationWhereInput[] | PublicationWhereInput
  NOT?: PublicationWhereInput[] | PublicationWhereInput
  avatarPath?: String
  avatarPath_not?: String
  avatarPath_in?: String[] | String
  avatarPath_not_in?: String[] | String
  avatarPath_lt?: String
  avatarPath_lte?: String
  avatarPath_gt?: String
  avatarPath_gte?: String
  avatarPath_contains?: String
  avatarPath_not_contains?: String
  avatarPath_starts_with?: String
  avatarPath_not_starts_with?: String
  avatarPath_ends_with?: String
  avatarPath_not_ends_with?: String
  name?: String
  name_not?: String
  name_in?: String[] | String
  name_not_in?: String[] | String
  name_lt?: String
  name_lte?: String
  name_gt?: String
  name_gte?: String
  name_contains?: String
  name_not_contains?: String
  name_starts_with?: String
  name_not_starts_with?: String
  name_ends_with?: String
  name_not_ends_with?: String
  _MagicalBackRelation_PublicationToSource_every?: SourceWhereInput
  _MagicalBackRelation_PublicationToSource_some?: SourceWhereInput
  _MagicalBackRelation_PublicationToSource_none?: SourceWhereInput
}

export interface DateUpdateOneInput {
  create?: DateCreateInput
  disconnect?: Boolean
  delete?: Boolean
  update?: DateUpdateDataInput
  upsert?: DateUpsertNestedInput
}

export interface UserSubscriptionWhereInput {
  AND?: UserSubscriptionWhereInput[] | UserSubscriptionWhereInput
  OR?: UserSubscriptionWhereInput[] | UserSubscriptionWhereInput
  NOT?: UserSubscriptionWhereInput[] | UserSubscriptionWhereInput
  mutation_in?: MutationType[] | MutationType
  updatedFields_contains?: String
  updatedFields_contains_every?: String[] | String
  updatedFields_contains_some?: String[] | String
  node?: UserWhereInput
}

export interface SourceUpdateManyInput {
  create?: SourceCreateInput[] | SourceCreateInput
}

export interface DateSubscriptionWhereInput {
  AND?: DateSubscriptionWhereInput[] | DateSubscriptionWhereInput
  OR?: DateSubscriptionWhereInput[] | DateSubscriptionWhereInput
  NOT?: DateSubscriptionWhereInput[] | DateSubscriptionWhereInput
  mutation_in?: MutationType[] | MutationType
  updatedFields_contains?: String
  updatedFields_contains_every?: String[] | String
  updatedFields_contains_some?: String[] | String
  node?: DateWhereInput
}

export interface TagUpsertWithWhereUniqueNestedInput {
  where: TagWhereUniqueInput
  update: TagUpdateDataInput
  create: TagCreateInput
}

export interface PublicationSubscriptionWhereInput {
  AND?: PublicationSubscriptionWhereInput[] | PublicationSubscriptionWhereInput
  OR?: PublicationSubscriptionWhereInput[] | PublicationSubscriptionWhereInput
  NOT?: PublicationSubscriptionWhereInput[] | PublicationSubscriptionWhereInput
  mutation_in?: MutationType[] | MutationType
  updatedFields_contains?: String
  updatedFields_contains_every?: String[] | String
  updatedFields_contains_some?: String[] | String
  node?: PublicationWhereInput
}

export interface VideoUpsertWithWhereUniqueNestedInput {
  where: VideoWhereUniqueInput
  update: VideoUpdateDataInput
  create: VideoCreateInput
}

export interface SourceSubscriptionWhereInput {
  AND?: SourceSubscriptionWhereInput[] | SourceSubscriptionWhereInput
  OR?: SourceSubscriptionWhereInput[] | SourceSubscriptionWhereInput
  NOT?: SourceSubscriptionWhereInput[] | SourceSubscriptionWhereInput
  mutation_in?: MutationType[] | MutationType
  updatedFields_contains?: String
  updatedFields_contains_every?: String[] | String
  updatedFields_contains_some?: String[] | String
  node?: SourceWhereInput
}

export interface VideoUpdateWithWhereUniqueNestedInput {
  where: VideoWhereUniqueInput
  data: VideoUpdateDataInput
}

export interface SpeechAPIConversationSubscriptionWhereInput {
  AND?: SpeechAPIConversationSubscriptionWhereInput[] | SpeechAPIConversationSubscriptionWhereInput
  OR?: SpeechAPIConversationSubscriptionWhereInput[] | SpeechAPIConversationSubscriptionWhereInput
  NOT?: SpeechAPIConversationSubscriptionWhereInput[] | SpeechAPIConversationSubscriptionWhereInput
  mutation_in?: MutationType[] | MutationType
  updatedFields_contains?: String
  updatedFields_contains_every?: String[] | String
  updatedFields_contains_some?: String[] | String
  node?: SpeechAPIConversationWhereInput
}

export interface VideoUpdateManyInput {
  create?: VideoCreateInput[] | VideoCreateInput
  connect?: VideoWhereUniqueInput[] | VideoWhereUniqueInput
  disconnect?: VideoWhereUniqueInput[] | VideoWhereUniqueInput
  delete?: VideoWhereUniqueInput[] | VideoWhereUniqueInput
  update?: VideoUpdateWithWhereUniqueNestedInput[] | VideoUpdateWithWhereUniqueNestedInput
  upsert?: VideoUpsertWithWhereUniqueNestedInput[] | VideoUpsertWithWhereUniqueNestedInput
}

export interface VideoUploadWhereInput {
  AND?: VideoUploadWhereInput[] | VideoUploadWhereInput
  OR?: VideoUploadWhereInput[] | VideoUploadWhereInput
  NOT?: VideoUploadWhereInput[] | VideoUploadWhereInput
  id?: ID_Input
  id_not?: ID_Input
  id_in?: ID_Input[] | ID_Input
  id_not_in?: ID_Input[] | ID_Input
  id_lt?: ID_Input
  id_lte?: ID_Input
  id_gt?: ID_Input
  id_gte?: ID_Input
  id_contains?: ID_Input
  id_not_contains?: ID_Input
  id_starts_with?: ID_Input
  id_not_starts_with?: ID_Input
  id_ends_with?: ID_Input
  id_not_ends_with?: ID_Input
  createdAt?: DateTime
  createdAt_not?: DateTime
  createdAt_in?: DateTime[] | DateTime
  createdAt_not_in?: DateTime[] | DateTime
  createdAt_lt?: DateTime
  createdAt_lte?: DateTime
  createdAt_gt?: DateTime
  createdAt_gte?: DateTime
  updatedAt?: DateTime
  updatedAt_not?: DateTime
  updatedAt_in?: DateTime[] | DateTime
  updatedAt_not_in?: DateTime[] | DateTime
  updatedAt_lt?: DateTime
  updatedAt_lte?: DateTime
  updatedAt_gt?: DateTime
  updatedAt_gte?: DateTime
  submitedUrl?: String
  submitedUrl_not?: String
  submitedUrl_in?: String[] | String
  submitedUrl_not_in?: String[] | String
  submitedUrl_lt?: String
  submitedUrl_lte?: String
  submitedUrl_gt?: String
  submitedUrl_gte?: String
  submitedUrl_contains?: String
  submitedUrl_not_contains?: String
  submitedUrl_starts_with?: String
  submitedUrl_not_starts_with?: String
  submitedUrl_ends_with?: String
  submitedUrl_not_ends_with?: String
  status?: VideoUploadStatus
  status_not?: VideoUploadStatus
  status_in?: VideoUploadStatus[] | VideoUploadStatus
  status_not_in?: VideoUploadStatus[] | VideoUploadStatus
  state?: VideoUploadState
  state_not?: VideoUploadState
  state_in?: VideoUploadState[] | VideoUploadState
  state_not_in?: VideoUploadState[] | VideoUploadState
  published?: Boolean
  published_not?: Boolean
  submitedBy?: UserWhereInput
  publishedBy?: UserWhereInput
  publishedVideo?: VideoWhereInput
  rawStorageLink?: VideoStorageLinkWhereInput
  webmLink?: VideoStorageLinkWhereInput
  mp4Link?: VideoStorageLinkWhereInput
  flacLink?: VideoStorageLinkWhereInput
  metadata?: VideoMetadataWhereInput
  thumbnail?: ThumbnailWhereInput
  generatedConversation?: SpeechAPIConversationWhereInput
  _MagicalBackRelation_SpeechAPIWordVideoRelation_every?: SpeechAPIWordWhereInput
  _MagicalBackRelation_SpeechAPIWordVideoRelation_some?: SpeechAPIWordWhereInput
  _MagicalBackRelation_SpeechAPIWordVideoRelation_none?: SpeechAPIWordWhereInput
  _MagicalBackRelation_SpeechAPIConversationBlockVideoRelation_every?: SpeechAPIConversationBlockWhereInput
  _MagicalBackRelation_SpeechAPIConversationBlockVideoRelation_some?: SpeechAPIConversationBlockWhereInput
  _MagicalBackRelation_SpeechAPIConversationBlockVideoRelation_none?: SpeechAPIConversationBlockWhereInput
}

export interface TagUpdateDataInput {
  name?: String
  videos?: VideoUpdateManyInput
}

export interface SpeechAPIConversationWhereInput {
  AND?: SpeechAPIConversationWhereInput[] | SpeechAPIConversationWhereInput
  OR?: SpeechAPIConversationWhereInput[] | SpeechAPIConversationWhereInput
  NOT?: SpeechAPIConversationWhereInput[] | SpeechAPIConversationWhereInput
  id?: ID_Input
  id_not?: ID_Input
  id_in?: ID_Input[] | ID_Input
  id_not_in?: ID_Input[] | ID_Input
  id_lt?: ID_Input
  id_lte?: ID_Input
  id_gt?: ID_Input
  id_gte?: ID_Input
  id_contains?: ID_Input
  id_not_contains?: ID_Input
  id_starts_with?: ID_Input
  id_not_starts_with?: ID_Input
  id_ends_with?: ID_Input
  id_not_ends_with?: ID_Input
  videoUpload?: VideoUploadWhereInput
  conversation_every?: SpeechAPIConversationBlockWhereInput
  conversation_some?: SpeechAPIConversationBlockWhereInput
  conversation_none?: SpeechAPIConversationBlockWhereInput
}

export interface TagUpdateWithWhereUniqueNestedInput {
  where: TagWhereUniqueInput
  data: TagUpdateDataInput
}

export interface SpeakerWhereUniqueInput {
  name?: String
}

export interface TagUpdateManyInput {
  create?: TagCreateInput[] | TagCreateInput
  connect?: TagWhereUniqueInput[] | TagWhereUniqueInput
  disconnect?: TagWhereUniqueInput[] | TagWhereUniqueInput
  delete?: TagWhereUniqueInput[] | TagWhereUniqueInput
  update?: TagUpdateWithWhereUniqueNestedInput[] | TagUpdateWithWhereUniqueNestedInput
  upsert?: TagUpsertWithWhereUniqueNestedInput[] | TagUpsertWithWhereUniqueNestedInput
}

export interface ThumbnailWhereUniqueInput {
  id?: ID_Input
}

export interface SpeakerCreateInput {
  name: String
  avatarPath: String
  title: String
}

export interface SpeechAPIWordWhereUniqueInput {
  id?: ID_Input
}

export interface SpeechAPIConversationCreateInput {
  videoUpload: VideoUploadCreateOneWithoutGeneratedConversationInput
  conversation?: SpeechAPIConversationBlockCreateManyInput
}

export interface VideoUploadWhereUniqueInput {
  id?: ID_Input
  submitedUrl?: String
}

export interface VideoUploadCreateOneWithoutGeneratedConversationInput {
  create?: VideoUploadCreateWithoutGeneratedConversationInput
  connect?: VideoUploadWhereUniqueInput
}

export interface VideoStorageLinkWhereUniqueInput {
  id?: ID_Input
}

export interface VideoUploadCreateWithoutGeneratedConversationInput {
  submitedUrl: String
  status: VideoUploadStatus
  state?: VideoUploadState
  published?: Boolean
  submitedBy: UserCreateOneInput
  publishedBy?: UserCreateOneInput
  publishedVideo?: VideoCreateOneInput
  rawStorageLink?: VideoStorageLinkCreateOneInput
  webmLink?: VideoStorageLinkCreateOneInput
  mp4Link?: VideoStorageLinkCreateOneInput
  flacLink?: VideoStorageLinkCreateOneInput
  metadata?: VideoMetadataCreateOneInput
  thumbnail?: ThumbnailCreateOneInput
}

export interface PublicationUpdateInput {
  avatarPath?: String
  name?: String
}

export interface UserCreateOneInput {
  create?: UserCreateInput
  connect?: UserWhereUniqueInput
}

export interface PublicationUpdateDataInput {
  avatarPath?: String
  name?: String
}

export interface UserCreateInput {
  email?: String
  auth0Id?: String
  role?: Role
  displayName?: String
  avatar?: String
  givenName?: String
  familyName?: String
  adminRoles?: UserCreateadminRolesInput
}

export interface SourceUpdateInput {
  url?: String
  title?: String
  priority?: Int
  publication?: PublicationUpdateOneInput
  videos?: VideoUpdateManyInput
}

export interface UserCreateadminRolesInput {
  set?: AdminRole[] | AdminRole
}

export interface VideoStorageLinkUpdateInput {
  videoID?: ID_Input
  path?: String
  bucket?: String
  version?: VideoVersion
}

export interface VideoCreateOneInput {
  create?: VideoCreateInput
  connect?: VideoWhereUniqueInput
}

export interface VideoUploadUpdateInput {
  submitedUrl?: String
  status?: VideoUploadStatus
  state?: VideoUploadState
  published?: Boolean
  submitedBy?: UserUpdateOneInput
  publishedBy?: UserUpdateOneInput
  publishedVideo?: VideoUpdateOneInput
  rawStorageLink?: VideoStorageLinkUpdateOneInput
  webmLink?: VideoStorageLinkUpdateOneInput
  mp4Link?: VideoStorageLinkUpdateOneInput
  flacLink?: VideoStorageLinkUpdateOneInput
  metadata?: VideoMetadataUpdateOneInput
  thumbnail?: ThumbnailUpdateOneInput
  generatedConversation?: SpeechAPIConversationUpdateOneWithoutVideoUploadInput
}

export interface VideoCreateInput {
  published?: Boolean
  advertisingEnabled?: Boolean
  views?: Int
}

export interface SpeechAPIWordUpdateInput {
  startTime?: Int
  endTime?: Int
  word?: String
  speakerTag?: Int
  videoUpload?: VideoUploadUpdateOneInput
}

export interface VideoStorageLinkCreateOneInput {
  create?: VideoStorageLinkCreateInput
  connect?: VideoStorageLinkWhereUniqueInput
}

export interface ThumbnailUpdateInput {
  videoID?: ID_Input
  path?: String
  bucket?: String
}

export interface VideoStorageLinkCreateInput {
  videoID: ID_Input
  path: String
  bucket: String
  version: VideoVersion
}

export interface SpeechAPIWordUpsertWithWhereUniqueNestedInput {
  where: SpeechAPIWordWhereUniqueInput
  update: SpeechAPIWordUpdateDataInput
  create: SpeechAPIWordCreateInput
}

export interface VideoMetadataCreateOneInput {
  create?: VideoMetadataCreateInput
}

export interface SpeechAPIConversationUpsertWithoutVideoUploadInput {
  update: SpeechAPIConversationUpdateWithoutVideoUploadDataInput
  create: SpeechAPIConversationCreateWithoutVideoUploadInput
}

export interface VideoMetadataCreateInput {
  title?: String
  subtitle?: String
  advertisingEnabled?: Boolean
  views?: Int
  tags?: TagCreateManyInput
  sources?: SourceCreateManyInput
  dateRecorded?: DateCreateOneInput
}

export interface SpeechAPIConversationUpdateOneWithoutVideoUploadInput {
  create?: SpeechAPIConversationCreateWithoutVideoUploadInput
  connect?: SpeechAPIConversationWhereUniqueInput
  disconnect?: Boolean
  delete?: Boolean
  update?: SpeechAPIConversationUpdateWithoutVideoUploadDataInput
  upsert?: SpeechAPIConversationUpsertWithoutVideoUploadInput
}

export interface TagCreateManyInput {
  create?: TagCreateInput[] | TagCreateInput
  connect?: TagWhereUniqueInput[] | TagWhereUniqueInput
}

export interface VideoUploadUpdateOneInput {
  create?: VideoUploadCreateInput
  connect?: VideoUploadWhereUniqueInput
  delete?: Boolean
  update?: VideoUploadUpdateDataInput
  upsert?: VideoUploadUpsertNestedInput
}

export interface TagCreateInput {
  name: String
  videos?: VideoCreateManyInput
}

export interface SpeechAPIWordUpdateWithWhereUniqueNestedInput {
  where: SpeechAPIWordWhereUniqueInput
  data: SpeechAPIWordUpdateDataInput
}

export interface VideoCreateManyInput {
  create?: VideoCreateInput[] | VideoCreateInput
  connect?: VideoWhereUniqueInput[] | VideoWhereUniqueInput
}

export interface SpeechAPIConversationBlockUpdateDataInput {
  speakerTag?: Int
  words?: SpeechAPIWordUpdateManyInput
  videoUpload?: VideoUploadUpdateOneInput
}

export interface VideoMetadataUpdateDataInput {
  title?: String
  subtitle?: String
  advertisingEnabled?: Boolean
  views?: Int
  tags?: TagUpdateManyInput
  sources?: SourceUpdateManyInput
  dateRecorded?: DateUpdateOneInput
}

export interface SpeechAPIConversationBlockUpdateManyInput {
  create?: SpeechAPIConversationBlockCreateInput[] | SpeechAPIConversationBlockCreateInput
  connect?: SpeechAPIConversationBlockWhereUniqueInput[] | SpeechAPIConversationBlockWhereUniqueInput
  disconnect?: SpeechAPIConversationBlockWhereUniqueInput[] | SpeechAPIConversationBlockWhereUniqueInput
  delete?: SpeechAPIConversationBlockWhereUniqueInput[] | SpeechAPIConversationBlockWhereUniqueInput
  update?: SpeechAPIConversationBlockUpdateWithWhereUniqueNestedInput[] | SpeechAPIConversationBlockUpdateWithWhereUniqueNestedInput
  upsert?: SpeechAPIConversationBlockUpsertWithWhereUniqueNestedInput[] | SpeechAPIConversationBlockUpsertWithWhereUniqueNestedInput
}

export interface SourceCreateInput {
  url: String
  title?: String
  priority?: Int
  publication: PublicationCreateOneInput
  videos?: VideoCreateManyInput
}

export interface DateWhereInput {
  AND?: DateWhereInput[] | DateWhereInput
  OR?: DateWhereInput[] | DateWhereInput
  NOT?: DateWhereInput[] | DateWhereInput
  month?: Int
  month_not?: Int
  month_in?: Int[] | Int
  month_not_in?: Int[] | Int
  month_lt?: Int
  month_lte?: Int
  month_gt?: Int
  month_gte?: Int
  day?: Int
  day_not?: Int
  day_in?: Int[] | Int
  day_not_in?: Int[] | Int
  day_lt?: Int
  day_lte?: Int
  day_gt?: Int
  day_gte?: Int
  year?: Int
  year_not?: Int
  year_in?: Int[] | Int
  year_not_in?: Int[] | Int
  year_lt?: Int
  year_lte?: Int
  year_gt?: Int
  year_gte?: Int
  _MagicalBackRelation_DateToVideoMetadata_every?: VideoMetadataWhereInput
  _MagicalBackRelation_DateToVideoMetadata_some?: VideoMetadataWhereInput
  _MagicalBackRelation_DateToVideoMetadata_none?: VideoMetadataWhereInput
}

export interface PublicationCreateOneInput {
  create?: PublicationCreateInput
}

export interface TagWhereInput {
  AND?: TagWhereInput[] | TagWhereInput
  OR?: TagWhereInput[] | TagWhereInput
  NOT?: TagWhereInput[] | TagWhereInput
  id?: ID_Input
  id_not?: ID_Input
  id_in?: ID_Input[] | ID_Input
  id_not_in?: ID_Input[] | ID_Input
  id_lt?: ID_Input
  id_lte?: ID_Input
  id_gt?: ID_Input
  id_gte?: ID_Input
  id_contains?: ID_Input
  id_not_contains?: ID_Input
  id_starts_with?: ID_Input
  id_not_starts_with?: ID_Input
  id_ends_with?: ID_Input
  id_not_ends_with?: ID_Input
  name?: String
  name_not?: String
  name_in?: String[] | String
  name_not_in?: String[] | String
  name_lt?: String
  name_lte?: String
  name_gt?: String
  name_gte?: String
  name_contains?: String
  name_not_contains?: String
  name_starts_with?: String
  name_not_starts_with?: String
  name_ends_with?: String
  name_not_ends_with?: String
  videos_every?: VideoWhereInput
  videos_some?: VideoWhereInput
  videos_none?: VideoWhereInput
  _MagicalBackRelation_TagToVideoMetadata_every?: VideoMetadataWhereInput
  _MagicalBackRelation_TagToVideoMetadata_some?: VideoMetadataWhereInput
  _MagicalBackRelation_TagToVideoMetadata_none?: VideoMetadataWhereInput
}

export interface PublicationCreateInput {
  avatarPath: String
  name: String
}

export interface VideoMetadataSubscriptionWhereInput {
  AND?: VideoMetadataSubscriptionWhereInput[] | VideoMetadataSubscriptionWhereInput
  OR?: VideoMetadataSubscriptionWhereInput[] | VideoMetadataSubscriptionWhereInput
  NOT?: VideoMetadataSubscriptionWhereInput[] | VideoMetadataSubscriptionWhereInput
  mutation_in?: MutationType[] | MutationType
  updatedFields_contains?: String
  updatedFields_contains_every?: String[] | String
  updatedFields_contains_some?: String[] | String
  node?: VideoMetadataWhereInput
}

export interface DateCreateOneInput {
  create?: DateCreateInput
}

export interface SourceWhereInput {
  AND?: SourceWhereInput[] | SourceWhereInput
  OR?: SourceWhereInput[] | SourceWhereInput
  NOT?: SourceWhereInput[] | SourceWhereInput
  url?: String
  url_not?: String
  url_in?: String[] | String
  url_not_in?: String[] | String
  url_lt?: String
  url_lte?: String
  url_gt?: String
  url_gte?: String
  url_contains?: String
  url_not_contains?: String
  url_starts_with?: String
  url_not_starts_with?: String
  url_ends_with?: String
  url_not_ends_with?: String
  title?: String
  title_not?: String
  title_in?: String[] | String
  title_not_in?: String[] | String
  title_lt?: String
  title_lte?: String
  title_gt?: String
  title_gte?: String
  title_contains?: String
  title_not_contains?: String
  title_starts_with?: String
  title_not_starts_with?: String
  title_ends_with?: String
  title_not_ends_with?: String
  priority?: Int
  priority_not?: Int
  priority_in?: Int[] | Int
  priority_not_in?: Int[] | Int
  priority_lt?: Int
  priority_lte?: Int
  priority_gt?: Int
  priority_gte?: Int
  publication?: PublicationWhereInput
  videos_every?: VideoWhereInput
  videos_some?: VideoWhereInput
  videos_none?: VideoWhereInput
  _MagicalBackRelation_SourceToVideoMetadata_every?: VideoMetadataWhereInput
  _MagicalBackRelation_SourceToVideoMetadata_some?: VideoMetadataWhereInput
  _MagicalBackRelation_SourceToVideoMetadata_none?: VideoMetadataWhereInput
}

export interface DateCreateInput {
  month: Int
  day: Int
  year: Int
}

export interface UserWhereInput {
  AND?: UserWhereInput[] | UserWhereInput
  OR?: UserWhereInput[] | UserWhereInput
  NOT?: UserWhereInput[] | UserWhereInput
  id?: ID_Input
  id_not?: ID_Input
  id_in?: ID_Input[] | ID_Input
  id_not_in?: ID_Input[] | ID_Input
  id_lt?: ID_Input
  id_lte?: ID_Input
  id_gt?: ID_Input
  id_gte?: ID_Input
  id_contains?: ID_Input
  id_not_contains?: ID_Input
  id_starts_with?: ID_Input
  id_not_starts_with?: ID_Input
  id_ends_with?: ID_Input
  id_not_ends_with?: ID_Input
  email?: String
  email_not?: String
  email_in?: String[] | String
  email_not_in?: String[] | String
  email_lt?: String
  email_lte?: String
  email_gt?: String
  email_gte?: String
  email_contains?: String
  email_not_contains?: String
  email_starts_with?: String
  email_not_starts_with?: String
  email_ends_with?: String
  email_not_ends_with?: String
  auth0Id?: String
  auth0Id_not?: String
  auth0Id_in?: String[] | String
  auth0Id_not_in?: String[] | String
  auth0Id_lt?: String
  auth0Id_lte?: String
  auth0Id_gt?: String
  auth0Id_gte?: String
  auth0Id_contains?: String
  auth0Id_not_contains?: String
  auth0Id_starts_with?: String
  auth0Id_not_starts_with?: String
  auth0Id_ends_with?: String
  auth0Id_not_ends_with?: String
  role?: Role
  role_not?: Role
  role_in?: Role[] | Role
  role_not_in?: Role[] | Role
  displayName?: String
  displayName_not?: String
  displayName_in?: String[] | String
  displayName_not_in?: String[] | String
  displayName_lt?: String
  displayName_lte?: String
  displayName_gt?: String
  displayName_gte?: String
  displayName_contains?: String
  displayName_not_contains?: String
  displayName_starts_with?: String
  displayName_not_starts_with?: String
  displayName_ends_with?: String
  displayName_not_ends_with?: String
  avatar?: String
  avatar_not?: String
  avatar_in?: String[] | String
  avatar_not_in?: String[] | String
  avatar_lt?: String
  avatar_lte?: String
  avatar_gt?: String
  avatar_gte?: String
  avatar_contains?: String
  avatar_not_contains?: String
  avatar_starts_with?: String
  avatar_not_starts_with?: String
  avatar_ends_with?: String
  avatar_not_ends_with?: String
  givenName?: String
  givenName_not?: String
  givenName_in?: String[] | String
  givenName_not_in?: String[] | String
  givenName_lt?: String
  givenName_lte?: String
  givenName_gt?: String
  givenName_gte?: String
  givenName_contains?: String
  givenName_not_contains?: String
  givenName_starts_with?: String
  givenName_not_starts_with?: String
  givenName_ends_with?: String
  givenName_not_ends_with?: String
  familyName?: String
  familyName_not?: String
  familyName_in?: String[] | String
  familyName_not_in?: String[] | String
  familyName_lt?: String
  familyName_lte?: String
  familyName_gt?: String
  familyName_gte?: String
  familyName_contains?: String
  familyName_not_contains?: String
  familyName_starts_with?: String
  familyName_not_starts_with?: String
  familyName_ends_with?: String
  familyName_not_ends_with?: String
  _MagicalBackRelation_VideoSubmitter_every?: VideoUploadWhereInput
  _MagicalBackRelation_VideoSubmitter_some?: VideoUploadWhereInput
  _MagicalBackRelation_VideoSubmitter_none?: VideoUploadWhereInput
  _MagicalBackRelation_VideoPublisher_every?: VideoUploadWhereInput
  _MagicalBackRelation_VideoPublisher_some?: VideoUploadWhereInput
  _MagicalBackRelation_VideoPublisher_none?: VideoUploadWhereInput
}

export interface ThumbnailCreateOneInput {
  create?: ThumbnailCreateInput
  connect?: ThumbnailWhereUniqueInput
}

export interface VideoMetadataUpdateInput {
  title?: String
  subtitle?: String
  advertisingEnabled?: Boolean
  views?: Int
  tags?: TagUpdateManyInput
  sources?: SourceUpdateManyInput
  dateRecorded?: DateUpdateOneInput
}

export interface ThumbnailCreateInput {
  videoID: ID_Input
  path: String
  bucket: String
}

export interface SpeechAPIConversationWhereUniqueInput {
  id?: ID_Input
}

export interface SpeechAPIConversationBlockCreateManyInput {
  create?: SpeechAPIConversationBlockCreateInput[] | SpeechAPIConversationBlockCreateInput
  connect?: SpeechAPIConversationBlockWhereUniqueInput[] | SpeechAPIConversationBlockWhereUniqueInput
}

export interface SpeechAPIConversationBlockWhereUniqueInput {
  id?: ID_Input
}

export interface SpeechAPIConversationBlockCreateInput {
  speakerTag: Int
  words?: SpeechAPIWordCreateManyInput
  videoUpload: VideoUploadCreateOneInput
}

export interface VideoWhereUniqueInput {
  id?: ID_Input
}

export interface SpeechAPIWordCreateManyInput {
  create?: SpeechAPIWordCreateInput[] | SpeechAPIWordCreateInput
  connect?: SpeechAPIWordWhereUniqueInput[] | SpeechAPIWordWhereUniqueInput
}

export interface PublicationUpdateOneInput {
  create?: PublicationCreateInput
  delete?: Boolean
  update?: PublicationUpdateDataInput
  upsert?: PublicationUpsertNestedInput
}

export interface SpeechAPIWordWhereInput {
  AND?: SpeechAPIWordWhereInput[] | SpeechAPIWordWhereInput
  OR?: SpeechAPIWordWhereInput[] | SpeechAPIWordWhereInput
  NOT?: SpeechAPIWordWhereInput[] | SpeechAPIWordWhereInput
  id?: ID_Input
  id_not?: ID_Input
  id_in?: ID_Input[] | ID_Input
  id_not_in?: ID_Input[] | ID_Input
  id_lt?: ID_Input
  id_lte?: ID_Input
  id_gt?: ID_Input
  id_gte?: ID_Input
  id_contains?: ID_Input
  id_not_contains?: ID_Input
  id_starts_with?: ID_Input
  id_not_starts_with?: ID_Input
  id_ends_with?: ID_Input
  id_not_ends_with?: ID_Input
  startTime?: Int
  startTime_not?: Int
  startTime_in?: Int[] | Int
  startTime_not_in?: Int[] | Int
  startTime_lt?: Int
  startTime_lte?: Int
  startTime_gt?: Int
  startTime_gte?: Int
  endTime?: Int
  endTime_not?: Int
  endTime_in?: Int[] | Int
  endTime_not_in?: Int[] | Int
  endTime_lt?: Int
  endTime_lte?: Int
  endTime_gt?: Int
  endTime_gte?: Int
  word?: String
  word_not?: String
  word_in?: String[] | String
  word_not_in?: String[] | String
  word_lt?: String
  word_lte?: String
  word_gt?: String
  word_gte?: String
  word_contains?: String
  word_not_contains?: String
  word_starts_with?: String
  word_not_starts_with?: String
  word_ends_with?: String
  word_not_ends_with?: String
  speakerTag?: Int
  speakerTag_not?: Int
  speakerTag_in?: Int[] | Int
  speakerTag_not_in?: Int[] | Int
  speakerTag_lt?: Int
  speakerTag_lte?: Int
  speakerTag_gt?: Int
  speakerTag_gte?: Int
  videoUpload?: VideoUploadWhereInput
  _MagicalBackRelation_SpeechAPIConversationBlockToSpeechAPIWord_every?: SpeechAPIConversationBlockWhereInput
  _MagicalBackRelation_SpeechAPIConversationBlockToSpeechAPIWord_some?: SpeechAPIConversationBlockWhereInput
  _MagicalBackRelation_SpeechAPIConversationBlockToSpeechAPIWord_none?: SpeechAPIConversationBlockWhereInput
}

export interface TagUpdateInput {
  name?: String
  videos?: VideoUpdateManyInput
}

export interface VideoStorageLinkWhereInput {
  AND?: VideoStorageLinkWhereInput[] | VideoStorageLinkWhereInput
  OR?: VideoStorageLinkWhereInput[] | VideoStorageLinkWhereInput
  NOT?: VideoStorageLinkWhereInput[] | VideoStorageLinkWhereInput
  id?: ID_Input
  id_not?: ID_Input
  id_in?: ID_Input[] | ID_Input
  id_not_in?: ID_Input[] | ID_Input
  id_lt?: ID_Input
  id_lte?: ID_Input
  id_gt?: ID_Input
  id_gte?: ID_Input
  id_contains?: ID_Input
  id_not_contains?: ID_Input
  id_starts_with?: ID_Input
  id_not_starts_with?: ID_Input
  id_ends_with?: ID_Input
  id_not_ends_with?: ID_Input
  videoID?: ID_Input
  videoID_not?: ID_Input
  videoID_in?: ID_Input[] | ID_Input
  videoID_not_in?: ID_Input[] | ID_Input
  videoID_lt?: ID_Input
  videoID_lte?: ID_Input
  videoID_gt?: ID_Input
  videoID_gte?: ID_Input
  videoID_contains?: ID_Input
  videoID_not_contains?: ID_Input
  videoID_starts_with?: ID_Input
  videoID_not_starts_with?: ID_Input
  videoID_ends_with?: ID_Input
  videoID_not_ends_with?: ID_Input
  path?: String
  path_not?: String
  path_in?: String[] | String
  path_not_in?: String[] | String
  path_lt?: String
  path_lte?: String
  path_gt?: String
  path_gte?: String
  path_contains?: String
  path_not_contains?: String
  path_starts_with?: String
  path_not_starts_with?: String
  path_ends_with?: String
  path_not_ends_with?: String
  bucket?: String
  bucket_not?: String
  bucket_in?: String[] | String
  bucket_not_in?: String[] | String
  bucket_lt?: String
  bucket_lte?: String
  bucket_gt?: String
  bucket_gte?: String
  bucket_contains?: String
  bucket_not_contains?: String
  bucket_starts_with?: String
  bucket_not_starts_with?: String
  bucket_ends_with?: String
  bucket_not_ends_with?: String
  version?: VideoVersion
  version_not?: VideoVersion
  version_in?: VideoVersion[] | VideoVersion
  version_not_in?: VideoVersion[] | VideoVersion
  _MagicalBackRelation_VideoMp4LinkRelation_every?: VideoUploadWhereInput
  _MagicalBackRelation_VideoMp4LinkRelation_some?: VideoUploadWhereInput
  _MagicalBackRelation_VideoMp4LinkRelation_none?: VideoUploadWhereInput
  _MagicalBackRelation_VideoFlacLinkRelation_every?: VideoUploadWhereInput
  _MagicalBackRelation_VideoFlacLinkRelation_some?: VideoUploadWhereInput
  _MagicalBackRelation_VideoFlacLinkRelation_none?: VideoUploadWhereInput
  _MagicalBackRelation_VideoStorageRawRelation_every?: VideoUploadWhereInput
  _MagicalBackRelation_VideoStorageRawRelation_some?: VideoUploadWhereInput
  _MagicalBackRelation_VideoStorageRawRelation_none?: VideoUploadWhereInput
  _MagicalBackRelation_VideoWebmLinkRelation_every?: VideoUploadWhereInput
  _MagicalBackRelation_VideoWebmLinkRelation_some?: VideoUploadWhereInput
  _MagicalBackRelation_VideoWebmLinkRelation_none?: VideoUploadWhereInput
}

export interface UserUpdateInput {
  email?: String
  auth0Id?: String
  role?: Role
  displayName?: String
  avatar?: String
  givenName?: String
  familyName?: String
  adminRoles?: UserUpdateadminRolesInput
}

export interface VideoUploadUpsertNestedInput {
  update: VideoUploadUpdateDataInput
  create: VideoUploadCreateInput
}

export interface VideoUploadUpdateDataInput {
  submitedUrl?: String
  status?: VideoUploadStatus
  state?: VideoUploadState
  published?: Boolean
  submitedBy?: UserUpdateOneInput
  publishedBy?: UserUpdateOneInput
  publishedVideo?: VideoUpdateOneInput
  rawStorageLink?: VideoStorageLinkUpdateOneInput
  webmLink?: VideoStorageLinkUpdateOneInput
  mp4Link?: VideoStorageLinkUpdateOneInput
  flacLink?: VideoStorageLinkUpdateOneInput
  metadata?: VideoMetadataUpdateOneInput
  thumbnail?: ThumbnailUpdateOneInput
  generatedConversation?: SpeechAPIConversationUpdateOneWithoutVideoUploadInput
}

export interface SpeechAPIConversationCreateOneWithoutVideoUploadInput {
  create?: SpeechAPIConversationCreateWithoutVideoUploadInput
  connect?: SpeechAPIConversationWhereUniqueInput
}

export interface SpeechAPIWordUpdateManyInput {
  create?: SpeechAPIWordCreateInput[] | SpeechAPIWordCreateInput
  connect?: SpeechAPIWordWhereUniqueInput[] | SpeechAPIWordWhereUniqueInput
  disconnect?: SpeechAPIWordWhereUniqueInput[] | SpeechAPIWordWhereUniqueInput
  delete?: SpeechAPIWordWhereUniqueInput[] | SpeechAPIWordWhereUniqueInput
  update?: SpeechAPIWordUpdateWithWhereUniqueNestedInput[] | SpeechAPIWordUpdateWithWhereUniqueNestedInput
  upsert?: SpeechAPIWordUpsertWithWhereUniqueNestedInput[] | SpeechAPIWordUpsertWithWhereUniqueNestedInput
}

export interface SpeechAPIConversationCreateWithoutVideoUploadInput {
  conversation?: SpeechAPIConversationBlockCreateManyInput
}

export interface VideoSubscriptionWhereInput {
  AND?: VideoSubscriptionWhereInput[] | VideoSubscriptionWhereInput
  OR?: VideoSubscriptionWhereInput[] | VideoSubscriptionWhereInput
  NOT?: VideoSubscriptionWhereInput[] | VideoSubscriptionWhereInput
  mutation_in?: MutationType[] | MutationType
  updatedFields_contains?: String
  updatedFields_contains_every?: String[] | String
  updatedFields_contains_some?: String[] | String
  node?: VideoWhereInput
}

export interface SpeakerUpdateInput {
  name?: String
  avatarPath?: String
  title?: String
}

export interface VideoMetadataWhereInput {
  AND?: VideoMetadataWhereInput[] | VideoMetadataWhereInput
  OR?: VideoMetadataWhereInput[] | VideoMetadataWhereInput
  NOT?: VideoMetadataWhereInput[] | VideoMetadataWhereInput
  title?: String
  title_not?: String
  title_in?: String[] | String
  title_not_in?: String[] | String
  title_lt?: String
  title_lte?: String
  title_gt?: String
  title_gte?: String
  title_contains?: String
  title_not_contains?: String
  title_starts_with?: String
  title_not_starts_with?: String
  title_ends_with?: String
  title_not_ends_with?: String
  subtitle?: String
  subtitle_not?: String
  subtitle_in?: String[] | String
  subtitle_not_in?: String[] | String
  subtitle_lt?: String
  subtitle_lte?: String
  subtitle_gt?: String
  subtitle_gte?: String
  subtitle_contains?: String
  subtitle_not_contains?: String
  subtitle_starts_with?: String
  subtitle_not_starts_with?: String
  subtitle_ends_with?: String
  subtitle_not_ends_with?: String
  advertisingEnabled?: Boolean
  advertisingEnabled_not?: Boolean
  views?: Int
  views_not?: Int
  views_in?: Int[] | Int
  views_not_in?: Int[] | Int
  views_lt?: Int
  views_lte?: Int
  views_gt?: Int
  views_gte?: Int
  tags_every?: TagWhereInput
  tags_some?: TagWhereInput
  tags_none?: TagWhereInput
  sources_every?: SourceWhereInput
  sources_some?: SourceWhereInput
  sources_none?: SourceWhereInput
  dateRecorded?: DateWhereInput
  _MagicalBackRelation_VideoUploadMetadataRelation_every?: VideoUploadWhereInput
  _MagicalBackRelation_VideoUploadMetadataRelation_some?: VideoUploadWhereInput
  _MagicalBackRelation_VideoUploadMetadataRelation_none?: VideoUploadWhereInput
}

export interface SpeechAPIConversationUpdateInput {
  videoUpload?: VideoUploadUpdateOneWithoutGeneratedConversationInput
  conversation?: SpeechAPIConversationBlockUpdateManyInput
}

export interface VideoWhereInput {
  AND?: VideoWhereInput[] | VideoWhereInput
  OR?: VideoWhereInput[] | VideoWhereInput
  NOT?: VideoWhereInput[] | VideoWhereInput
  id?: ID_Input
  id_not?: ID_Input
  id_in?: ID_Input[] | ID_Input
  id_not_in?: ID_Input[] | ID_Input
  id_lt?: ID_Input
  id_lte?: ID_Input
  id_gt?: ID_Input
  id_gte?: ID_Input
  id_contains?: ID_Input
  id_not_contains?: ID_Input
  id_starts_with?: ID_Input
  id_not_starts_with?: ID_Input
  id_ends_with?: ID_Input
  id_not_ends_with?: ID_Input
  published?: Boolean
  published_not?: Boolean
  advertisingEnabled?: Boolean
  advertisingEnabled_not?: Boolean
  views?: Int
  views_not?: Int
  views_in?: Int[] | Int
  views_not_in?: Int[] | Int
  views_lt?: Int
  views_lte?: Int
  views_gt?: Int
  views_gte?: Int
  _MagicalBackRelation_SourceToVideo_every?: SourceWhereInput
  _MagicalBackRelation_SourceToVideo_some?: SourceWhereInput
  _MagicalBackRelation_SourceToVideo_none?: SourceWhereInput
  _MagicalBackRelation_TagToVideo_every?: TagWhereInput
  _MagicalBackRelation_TagToVideo_some?: TagWhereInput
  _MagicalBackRelation_TagToVideo_none?: TagWhereInput
  _MagicalBackRelation_VideoToVideoUpload_every?: VideoUploadWhereInput
  _MagicalBackRelation_VideoToVideoUpload_some?: VideoUploadWhereInput
  _MagicalBackRelation_VideoToVideoUpload_none?: VideoUploadWhereInput
}

export interface VideoUploadUpdateOneWithoutGeneratedConversationInput {
  create?: VideoUploadCreateWithoutGeneratedConversationInput
  connect?: VideoUploadWhereUniqueInput
  delete?: Boolean
  update?: VideoUploadUpdateWithoutGeneratedConversationDataInput
  upsert?: VideoUploadUpsertWithoutGeneratedConversationInput
}

export interface DateUpdateInput {
  month?: Int
  day?: Int
  year?: Int
}

export interface VideoUploadUpdateWithoutGeneratedConversationDataInput {
  submitedUrl?: String
  status?: VideoUploadStatus
  state?: VideoUploadState
  published?: Boolean
  submitedBy?: UserUpdateOneInput
  publishedBy?: UserUpdateOneInput
  publishedVideo?: VideoUpdateOneInput
  rawStorageLink?: VideoStorageLinkUpdateOneInput
  webmLink?: VideoStorageLinkUpdateOneInput
  mp4Link?: VideoStorageLinkUpdateOneInput
  flacLink?: VideoStorageLinkUpdateOneInput
  metadata?: VideoMetadataUpdateOneInput
  thumbnail?: ThumbnailUpdateOneInput
}

export interface TagWhereUniqueInput {
  id?: ID_Input
}

export interface UserUpdateOneInput {
  create?: UserCreateInput
  connect?: UserWhereUniqueInput
  delete?: Boolean
  update?: UserUpdateDataInput
  upsert?: UserUpsertNestedInput
}

export interface VideoUpdateInput {
  published?: Boolean
  advertisingEnabled?: Boolean
  views?: Int
}

export interface UserUpdateDataInput {
  email?: String
  auth0Id?: String
  role?: Role
  displayName?: String
  avatar?: String
  givenName?: String
  familyName?: String
  adminRoles?: UserUpdateadminRolesInput
}

export interface SpeechAPIConversationBlockUpsertWithWhereUniqueNestedInput {
  where: SpeechAPIConversationBlockWhereUniqueInput
  update: SpeechAPIConversationBlockUpdateDataInput
  create: SpeechAPIConversationBlockCreateInput
}

export interface UserUpdateadminRolesInput {
  set?: AdminRole[] | AdminRole
}

export interface SpeechAPIWordUpdateDataInput {
  startTime?: Int
  endTime?: Int
  word?: String
  speakerTag?: Int
  videoUpload?: VideoUploadUpdateOneInput
}

export interface UserUpsertNestedInput {
  update: UserUpdateDataInput
  create: UserCreateInput
}

export interface VideoUploadSubscriptionWhereInput {
  AND?: VideoUploadSubscriptionWhereInput[] | VideoUploadSubscriptionWhereInput
  OR?: VideoUploadSubscriptionWhereInput[] | VideoUploadSubscriptionWhereInput
  NOT?: VideoUploadSubscriptionWhereInput[] | VideoUploadSubscriptionWhereInput
  mutation_in?: MutationType[] | MutationType
  updatedFields_contains?: String
  updatedFields_contains_every?: String[] | String
  updatedFields_contains_some?: String[] | String
  node?: VideoUploadWhereInput
}

export interface VideoUpdateOneInput {
  create?: VideoCreateInput
  connect?: VideoWhereUniqueInput
  disconnect?: Boolean
  delete?: Boolean
  update?: VideoUpdateDataInput
  upsert?: VideoUpsertNestedInput
}

export interface SpeakerSubscriptionWhereInput {
  AND?: SpeakerSubscriptionWhereInput[] | SpeakerSubscriptionWhereInput
  OR?: SpeakerSubscriptionWhereInput[] | SpeakerSubscriptionWhereInput
  NOT?: SpeakerSubscriptionWhereInput[] | SpeakerSubscriptionWhereInput
  mutation_in?: MutationType[] | MutationType
  updatedFields_contains?: String
  updatedFields_contains_every?: String[] | String
  updatedFields_contains_some?: String[] | String
  node?: SpeakerWhereInput
}

export interface VideoUpdateDataInput {
  published?: Boolean
  advertisingEnabled?: Boolean
  views?: Int
}

export interface PublicationUpsertNestedInput {
  update: PublicationUpdateDataInput
  create: PublicationCreateInput
}

export interface VideoStorageLinkUpsertNestedInput {
  update: VideoStorageLinkUpdateDataInput
  create: VideoStorageLinkCreateInput
}

export interface VideoStorageLinkUpdateDataInput {
  videoID?: ID_Input
  path?: String
  bucket?: String
  version?: VideoVersion
}

export interface VideoStorageLinkUpdateOneInput {
  create?: VideoStorageLinkCreateInput
  connect?: VideoStorageLinkWhereUniqueInput
  disconnect?: Boolean
  delete?: Boolean
  update?: VideoStorageLinkUpdateDataInput
  upsert?: VideoStorageLinkUpsertNestedInput
}

export interface VideoUpsertNestedInput {
  update: VideoUpdateDataInput
  create: VideoCreateInput
}

export interface SpeechAPIConversationBlockUpdateInput {
  speakerTag?: Int
  words?: SpeechAPIWordUpdateManyInput
  videoUpload?: VideoUploadUpdateOneInput
}

export interface UserWhereUniqueInput {
  id?: ID_Input
  auth0Id?: String
}

export interface ThumbnailSubscriptionWhereInput {
  AND?: ThumbnailSubscriptionWhereInput[] | ThumbnailSubscriptionWhereInput
  OR?: ThumbnailSubscriptionWhereInput[] | ThumbnailSubscriptionWhereInput
  NOT?: ThumbnailSubscriptionWhereInput[] | ThumbnailSubscriptionWhereInput
  mutation_in?: MutationType[] | MutationType
  updatedFields_contains?: String
  updatedFields_contains_every?: String[] | String
  updatedFields_contains_some?: String[] | String
  node?: ThumbnailWhereInput
}

export interface SpeechAPIConversationBlockUpdateWithWhereUniqueNestedInput {
  where: SpeechAPIConversationBlockWhereUniqueInput
  data: SpeechAPIConversationBlockUpdateDataInput
}

export interface SpeechAPIConversationUpdateWithoutVideoUploadDataInput {
  conversation?: SpeechAPIConversationBlockUpdateManyInput
}

/*
 * An object with an ID

 */
export interface Node {
  id: ID_Output
}

export interface VideoPreviousValues {
  id: ID_Output
  published?: Boolean
  advertisingEnabled?: Boolean
  views?: Int
}

/*
 * A connection to a list of items.

 */
export interface SpeakerConnection {
  pageInfo: PageInfo
  edges: SpeakerEdge[]
  aggregate: AggregateSpeaker
}

export interface SpeechAPIConversation extends Node {
  id: ID_Output
  videoUpload: VideoUpload
  conversation?: SpeechAPIConversationBlock[]
}

export interface Speaker {
  name: String
  avatarPath: String
  title: String
}

/*
 * An edge in a connection.

 */
export interface VideoEdge {
  node: Video
  cursor: String
}

export interface AggregateVideo {
  count: Int
}

export interface User extends Node {
  id: ID_Output
  email?: String
  auth0Id?: String
  role?: Role
  displayName?: String
  avatar?: String
  givenName?: String
  familyName?: String
  adminRoles: AdminRole[]
}

/*
 * A connection to a list of items.

 */
export interface VideoConnection {
  pageInfo: PageInfo
  edges: VideoEdge[]
  aggregate: AggregateVideo
}

export interface AggregateVideoStorageLink {
  count: Int
}

/*
 * An edge in a connection.

 */
export interface VideoStorageLinkEdge {
  node: VideoStorageLink
  cursor: String
}

export interface AggregateTag {
  count: Int
}

export interface VideoUpload extends Node {
  id: ID_Output
  createdAt: DateTime
  updatedAt: DateTime
  submitedBy: User
  publishedBy?: User
  publishedVideo?: Video
  submitedUrl: String
  status: VideoUploadStatus
  state: VideoUploadState
  published: Boolean
  rawStorageLink?: VideoStorageLink
  webmLink?: VideoStorageLink
  mp4Link?: VideoStorageLink
  flacLink?: VideoStorageLink
  metadata?: VideoMetadata
  thumbnail?: Thumbnail
  generatedConversation?: SpeechAPIConversation
}

/*
 * A connection to a list of items.

 */
export interface TagConnection {
  pageInfo: PageInfo
  edges: TagEdge[]
  aggregate: AggregateTag
}

export interface VideoStorageLinkPreviousValues {
  id: ID_Output
  videoID: ID_Output
  path: String
  bucket: String
  version: VideoVersion
}

/*
 * An edge in a connection.

 */
export interface VideoUploadEdge {
  node: VideoUpload
  cursor: String
}

export interface SpeakerSubscriptionPayload {
  mutation: MutationType
  node?: Speaker
  updatedFields?: String[]
  previousValues?: SpeakerPreviousValues
}

export interface AggregateSpeechAPIConversationBlock {
  count: Int
}

export interface SpeakerPreviousValues {
  name: String
  avatarPath: String
  title: String
}

/*
 * A connection to a list of items.

 */
export interface SpeechAPIConversationBlockConnection {
  pageInfo: PageInfo
  edges: SpeechAPIConversationBlockEdge[]
  aggregate: AggregateSpeechAPIConversationBlock
}

export interface VideoStorageLinkSubscriptionPayload {
  mutation: MutationType
  node?: VideoStorageLink
  updatedFields?: String[]
  previousValues?: VideoStorageLinkPreviousValues
}

/*
 * An edge in a connection.

 */
export interface SpeechAPIWordEdge {
  node: SpeechAPIWord
  cursor: String
}

export interface SpeechAPIConversationSubscriptionPayload {
  mutation: MutationType
  node?: SpeechAPIConversation
  updatedFields?: String[]
  previousValues?: SpeechAPIConversationPreviousValues
}

export interface AggregateVideoMetadata {
  count: Int
}

export interface SpeechAPIConversationPreviousValues {
  id: ID_Output
}

/*
 * A connection to a list of items.

 */
export interface VideoMetadataConnection {
  pageInfo: PageInfo
  edges: VideoMetadataEdge[]
  aggregate: AggregateVideoMetadata
}

export interface SpeechAPIWord extends Node {
  id: ID_Output
  startTime: Int
  endTime: Int
  word: String
  speakerTag: Int
  videoUpload: VideoUpload
}

/*
 * An edge in a connection.

 */
export interface UserEdge {
  node: User
  cursor: String
}

export interface SourceSubscriptionPayload {
  mutation: MutationType
  node?: Source
  updatedFields?: String[]
  previousValues?: SourcePreviousValues
}

export interface AggregateThumbnail {
  count: Int
}

export interface SourcePreviousValues {
  url: String
  title?: String
  priority: Int
}

/*
 * A connection to a list of items.

 */
export interface ThumbnailConnection {
  pageInfo: PageInfo
  edges: ThumbnailEdge[]
  aggregate: AggregateThumbnail
}

export interface SpeechAPIConversationBlock extends Node {
  id: ID_Output
  speakerTag: Int
  words?: SpeechAPIWord[]
  videoUpload: VideoUpload
}

/*
 * An edge in a connection.

 */
export interface DateEdge {
  node: Date
  cursor: String
}

export interface PublicationSubscriptionPayload {
  mutation: MutationType
  node?: Publication
  updatedFields?: String[]
  previousValues?: PublicationPreviousValues
}

export interface AggregatePublication {
  count: Int
}

export interface PublicationPreviousValues {
  avatarPath: String
  name: String
}

/*
 * A connection to a list of items.

 */
export interface PublicationConnection {
  pageInfo: PageInfo
  edges: PublicationEdge[]
  aggregate: AggregatePublication
}

export interface Thumbnail extends Node {
  id: ID_Output
  videoID: ID_Output
  path: String
  bucket: String
}

/*
 * An edge in a connection.

 */
export interface SourceEdge {
  node: Source
  cursor: String
}

export interface DateSubscriptionPayload {
  mutation: MutationType
  node?: Date
  updatedFields?: String[]
  previousValues?: DatePreviousValues
}

export interface AggregateSpeechAPIConversation {
  count: Int
}

export interface DatePreviousValues {
  month: Int
  day: Int
  year: Int
}

export interface BatchPayload {
  count: Long
}

export interface Date {
  month: Int
  day: Int
  year: Int
}

/*
 * A connection to a list of items.

 */
export interface SpeechAPIConversationConnection {
  pageInfo: PageInfo
  edges: SpeechAPIConversationEdge[]
  aggregate: AggregateSpeechAPIConversation
}

export interface ThumbnailSubscriptionPayload {
  mutation: MutationType
  node?: Thumbnail
  updatedFields?: String[]
  previousValues?: ThumbnailPreviousValues
}

/*
 * An edge in a connection.

 */
export interface SpeakerEdge {
  node: Speaker
  cursor: String
}

export interface ThumbnailPreviousValues {
  id: ID_Output
  videoID: ID_Output
  path: String
  bucket: String
}

/*
 * A connection to a list of items.

 */
export interface VideoStorageLinkConnection {
  pageInfo: PageInfo
  edges: VideoStorageLinkEdge[]
  aggregate: AggregateVideoStorageLink
}

export interface Publication {
  avatarPath: String
  name: String
}

export interface AggregateVideoUpload {
  count: Int
}

export interface UserSubscriptionPayload {
  mutation: MutationType
  node?: User
  updatedFields?: String[]
  previousValues?: UserPreviousValues
}

/*
 * An edge in a connection.

 */
export interface SpeechAPIConversationBlockEdge {
  node: SpeechAPIConversationBlock
  cursor: String
}

export interface UserPreviousValues {
  id: ID_Output
  email?: String
  auth0Id?: String
  role?: Role
  displayName?: String
  avatar?: String
  givenName?: String
  familyName?: String
  adminRoles: AdminRole[]
}

/*
 * A connection to a list of items.

 */
export interface SpeechAPIWordConnection {
  pageInfo: PageInfo
  edges: SpeechAPIWordEdge[]
  aggregate: AggregateSpeechAPIWord
}

export interface Source {
  publication: Publication
  url: String
  title?: String
  videos?: Video[]
  priority: Int
}

export interface AggregateUser {
  count: Int
}

export interface VideoMetadataSubscriptionPayload {
  mutation: MutationType
  node?: VideoMetadata
  updatedFields?: String[]
  previousValues?: VideoMetadataPreviousValues
}

/*
 * An edge in a connection.

 */
export interface ThumbnailEdge {
  node: Thumbnail
  cursor: String
}

export interface VideoMetadataPreviousValues {
  title?: String
  subtitle?: String
  advertisingEnabled: Boolean
  views: Int
}

/*
 * A connection to a list of items.

 */
export interface DateConnection {
  pageInfo: PageInfo
  edges: DateEdge[]
  aggregate: AggregateDate
}

export interface Tag extends Node {
  id: ID_Output
  name: String
  videos?: Video[]
}

export interface AggregateSource {
  count: Int
}

export interface SpeechAPIWordSubscriptionPayload {
  mutation: MutationType
  node?: SpeechAPIWord
  updatedFields?: String[]
  previousValues?: SpeechAPIWordPreviousValues
}

/*
 * An edge in a connection.

 */
export interface SpeechAPIConversationEdge {
  node: SpeechAPIConversation
  cursor: String
}

export interface SpeechAPIWordPreviousValues {
  id: ID_Output
  startTime: Int
  endTime: Int
  word: String
  speakerTag: Int
}

export interface AggregateSpeaker {
  count: Int
}

export interface VideoMetadata {
  title?: String
  subtitle?: String
  advertisingEnabled: Boolean
  tags?: Tag[]
  sources?: Source[]
  dateRecorded?: Date
  views: Int
}

/*
 * An edge in a connection.

 */
export interface TagEdge {
  node: Tag
  cursor: String
}

export interface SpeechAPIConversationBlockSubscriptionPayload {
  mutation: MutationType
  node?: SpeechAPIConversationBlock
  updatedFields?: String[]
  previousValues?: SpeechAPIConversationBlockPreviousValues
}

export interface AggregateSpeechAPIWord {
  count: Int
}

export interface SpeechAPIConversationBlockPreviousValues {
  id: ID_Output
  speakerTag: Int
}

/*
 * A connection to a list of items.

 */
export interface UserConnection {
  pageInfo: PageInfo
  edges: UserEdge[]
  aggregate: AggregateUser
}

export interface VideoStorageLink extends Node {
  id: ID_Output
  videoID: ID_Output
  path: String
  bucket: String
  version: VideoVersion
}

/*
 * An edge in a connection.

 */
export interface PublicationEdge {
  node: Publication
  cursor: String
}

export interface VideoUploadSubscriptionPayload {
  mutation: MutationType
  node?: VideoUpload
  updatedFields?: String[]
  previousValues?: VideoUploadPreviousValues
}

export interface VideoSubscriptionPayload {
  mutation: MutationType
  node?: Video
  updatedFields?: String[]
  previousValues?: VideoPreviousValues
}

/*
 * A connection to a list of items.

 */
export interface VideoUploadConnection {
  pageInfo: PageInfo
  edges: VideoUploadEdge[]
  aggregate: AggregateVideoUpload
}

export interface TagPreviousValues {
  id: ID_Output
  name: String
}

export interface TagSubscriptionPayload {
  mutation: MutationType
  node?: Tag
  updatedFields?: String[]
  previousValues?: TagPreviousValues
}

export interface Video extends Node {
  id: ID_Output
  published?: Boolean
  advertisingEnabled?: Boolean
  views?: Int
}

export interface VideoUploadPreviousValues {
  id: ID_Output
  createdAt: DateTime
  updatedAt: DateTime
  submitedUrl: String
  status: VideoUploadStatus
  state: VideoUploadState
  published: Boolean
}

/*
 * An edge in a connection.

 */
export interface VideoMetadataEdge {
  node: VideoMetadata
  cursor: String
}

/*
 * Information about pagination in a connection.

 */
export interface PageInfo {
  hasNextPage: Boolean
  hasPreviousPage: Boolean
  startCursor?: String
  endCursor?: String
}

/*
 * A connection to a list of items.

 */
export interface SourceConnection {
  pageInfo: PageInfo
  edges: SourceEdge[]
  aggregate: AggregateSource
}

export interface AggregateDate {
  count: Int
}

/*
The `ID` scalar type represents a unique identifier, often used to refetch an object or as key for a cache. The ID type appears in a JSON response as a String; however, it is not intended to be human-readable. When expected as an input type, any string (such as `"4"`) or integer (such as `4`) input value will be accepted as an ID.
*/
export type ID_Input = string | number
export type ID_Output = string

/*
The `String` scalar type represents textual data, represented as UTF-8 character sequences. The String type is most often used by GraphQL to represent free-form human-readable text.
*/
export type String = string

/*
The `Long` scalar type represents non-fractional signed whole numeric values.
Long can represent values between -(2^63) and 2^63 - 1.
*/
export type Long = string

export type DateTime = Date | string

/*
The `Int` scalar type represents non-fractional signed whole numeric values. Int can represent values between -(2^31) and 2^31 - 1. 
*/
export type Int = number

/*
The `Boolean` scalar type represents `true` or `false`.
*/
export type Boolean = boolean