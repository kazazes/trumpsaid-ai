import { GraphQLResolveInfo, GraphQLSchema } from 'graphql'
import { IResolvers } from 'graphql-tools/dist/Interfaces'
import { Options } from 'graphql-binding'
import { makePrismaBindingClass, BasePrismaOptions } from 'prisma-binding'

export interface Query {
    videoUploads: <T = VideoUpload[]>(args: { where?: VideoUploadWhereInput, orderBy?: VideoUploadOrderByInput, skip?: Int, after?: String, before?: String, first?: Int, last?: Int }, info?: GraphQLResolveInfo | string, options?: Options) => Promise<T> ,
    videoUploadStorageLinks: <T = VideoUploadStorageLink[]>(args: { where?: VideoUploadStorageLinkWhereInput, orderBy?: VideoUploadStorageLinkOrderByInput, skip?: Int, after?: String, before?: String, first?: Int, last?: Int }, info?: GraphQLResolveInfo | string, options?: Options) => Promise<T> ,
    videoUploadMetadatas: <T = VideoUploadMetadata[]>(args: { where?: VideoUploadMetadataWhereInput, orderBy?: VideoUploadMetadataOrderByInput, skip?: Int, after?: String, before?: String, first?: Int, last?: Int }, info?: GraphQLResolveInfo | string, options?: Options) => Promise<T> ,
    videoUploadAdminMetadatas: <T = VideoUploadAdminMetadata[]>(args: { where?: VideoUploadAdminMetadataWhereInput, orderBy?: VideoUploadAdminMetadataOrderByInput, skip?: Int, after?: String, before?: String, first?: Int, last?: Int }, info?: GraphQLResolveInfo | string, options?: Options) => Promise<T> ,
    videoUploadStatusLogItems: <T = VideoUploadStatusLogItem[]>(args: { where?: VideoUploadStatusLogItemWhereInput, orderBy?: VideoUploadStatusLogItemOrderByInput, skip?: Int, after?: String, before?: String, first?: Int, last?: Int }, info?: GraphQLResolveInfo | string, options?: Options) => Promise<T> ,
    conversationBlocks: <T = ConversationBlock[]>(args: { where?: ConversationBlockWhereInput, orderBy?: ConversationBlockOrderByInput, skip?: Int, after?: String, before?: String, first?: Int, last?: Int }, info?: GraphQLResolveInfo | string, options?: Options) => Promise<T> ,
    dates: <T = Date[]>(args: { where?: DateWhereInput, orderBy?: DateOrderByInput, skip?: Int, after?: String, before?: String, first?: Int, last?: Int }, info?: GraphQLResolveInfo | string, options?: Options) => Promise<T> ,
    videoConversations: <T = VideoConversation[]>(args: { where?: VideoConversationWhereInput, orderBy?: VideoConversationOrderByInput, skip?: Int, after?: String, before?: String, first?: Int, last?: Int }, info?: GraphQLResolveInfo | string, options?: Options) => Promise<T> ,
    speakers: <T = Speaker[]>(args: { where?: SpeakerWhereInput, orderBy?: SpeakerOrderByInput, skip?: Int, after?: String, before?: String, first?: Int, last?: Int }, info?: GraphQLResolveInfo | string, options?: Options) => Promise<T> ,
    users: <T = User[]>(args: { where?: UserWhereInput, orderBy?: UserOrderByInput, skip?: Int, after?: String, before?: String, first?: Int, last?: Int }, info?: GraphQLResolveInfo | string, options?: Options) => Promise<T> ,
    videoUpload: <T = VideoUpload | null>(args: { where: VideoUploadWhereUniqueInput }, info?: GraphQLResolveInfo | string, options?: Options) => Promise<T> ,
    videoUploadStorageLink: <T = VideoUploadStorageLink | null>(args: { where: VideoUploadStorageLinkWhereUniqueInput }, info?: GraphQLResolveInfo | string, options?: Options) => Promise<T> ,
    videoUploadMetadata: <T = VideoUploadMetadata | null>(args: { where: VideoUploadMetadataWhereUniqueInput }, info?: GraphQLResolveInfo | string, options?: Options) => Promise<T> ,
    videoUploadAdminMetadata: <T = VideoUploadAdminMetadata | null>(args: { where: VideoUploadAdminMetadataWhereUniqueInput }, info?: GraphQLResolveInfo | string, options?: Options) => Promise<T> ,
    videoUploadStatusLogItem: <T = VideoUploadStatusLogItem | null>(args: { where: VideoUploadStatusLogItemWhereUniqueInput }, info?: GraphQLResolveInfo | string, options?: Options) => Promise<T> ,
    videoConversation: <T = VideoConversation | null>(args: { where: VideoConversationWhereUniqueInput }, info?: GraphQLResolveInfo | string, options?: Options) => Promise<T> ,
    speaker: <T = Speaker | null>(args: { where: SpeakerWhereUniqueInput }, info?: GraphQLResolveInfo | string, options?: Options) => Promise<T> ,
    user: <T = User | null>(args: { where: UserWhereUniqueInput }, info?: GraphQLResolveInfo | string, options?: Options) => Promise<T> ,
    videoUploadsConnection: <T = VideoUploadConnection>(args: { where?: VideoUploadWhereInput, orderBy?: VideoUploadOrderByInput, skip?: Int, after?: String, before?: String, first?: Int, last?: Int }, info?: GraphQLResolveInfo | string, options?: Options) => Promise<T> ,
    videoUploadStorageLinksConnection: <T = VideoUploadStorageLinkConnection>(args: { where?: VideoUploadStorageLinkWhereInput, orderBy?: VideoUploadStorageLinkOrderByInput, skip?: Int, after?: String, before?: String, first?: Int, last?: Int }, info?: GraphQLResolveInfo | string, options?: Options) => Promise<T> ,
    videoUploadMetadatasConnection: <T = VideoUploadMetadataConnection>(args: { where?: VideoUploadMetadataWhereInput, orderBy?: VideoUploadMetadataOrderByInput, skip?: Int, after?: String, before?: String, first?: Int, last?: Int }, info?: GraphQLResolveInfo | string, options?: Options) => Promise<T> ,
    videoUploadAdminMetadatasConnection: <T = VideoUploadAdminMetadataConnection>(args: { where?: VideoUploadAdminMetadataWhereInput, orderBy?: VideoUploadAdminMetadataOrderByInput, skip?: Int, after?: String, before?: String, first?: Int, last?: Int }, info?: GraphQLResolveInfo | string, options?: Options) => Promise<T> ,
    videoUploadStatusLogItemsConnection: <T = VideoUploadStatusLogItemConnection>(args: { where?: VideoUploadStatusLogItemWhereInput, orderBy?: VideoUploadStatusLogItemOrderByInput, skip?: Int, after?: String, before?: String, first?: Int, last?: Int }, info?: GraphQLResolveInfo | string, options?: Options) => Promise<T> ,
    conversationBlocksConnection: <T = ConversationBlockConnection>(args: { where?: ConversationBlockWhereInput, orderBy?: ConversationBlockOrderByInput, skip?: Int, after?: String, before?: String, first?: Int, last?: Int }, info?: GraphQLResolveInfo | string, options?: Options) => Promise<T> ,
    datesConnection: <T = DateConnection>(args: { where?: DateWhereInput, orderBy?: DateOrderByInput, skip?: Int, after?: String, before?: String, first?: Int, last?: Int }, info?: GraphQLResolveInfo | string, options?: Options) => Promise<T> ,
    videoConversationsConnection: <T = VideoConversationConnection>(args: { where?: VideoConversationWhereInput, orderBy?: VideoConversationOrderByInput, skip?: Int, after?: String, before?: String, first?: Int, last?: Int }, info?: GraphQLResolveInfo | string, options?: Options) => Promise<T> ,
    speakersConnection: <T = SpeakerConnection>(args: { where?: SpeakerWhereInput, orderBy?: SpeakerOrderByInput, skip?: Int, after?: String, before?: String, first?: Int, last?: Int }, info?: GraphQLResolveInfo | string, options?: Options) => Promise<T> ,
    usersConnection: <T = UserConnection>(args: { where?: UserWhereInput, orderBy?: UserOrderByInput, skip?: Int, after?: String, before?: String, first?: Int, last?: Int }, info?: GraphQLResolveInfo | string, options?: Options) => Promise<T> ,
    node: <T = Node | null>(args: { id: ID_Output }, info?: GraphQLResolveInfo | string, options?: Options) => Promise<T> 
  }

export interface Mutation {
    createVideoUpload: <T = VideoUpload>(args: { data: VideoUploadCreateInput }, info?: GraphQLResolveInfo | string, options?: Options) => Promise<T> ,
    createVideoUploadStorageLink: <T = VideoUploadStorageLink>(args: { data: VideoUploadStorageLinkCreateInput }, info?: GraphQLResolveInfo | string, options?: Options) => Promise<T> ,
    createVideoUploadMetadata: <T = VideoUploadMetadata>(args: { data: VideoUploadMetadataCreateInput }, info?: GraphQLResolveInfo | string, options?: Options) => Promise<T> ,
    createVideoUploadAdminMetadata: <T = VideoUploadAdminMetadata>(args: { data: VideoUploadAdminMetadataCreateInput }, info?: GraphQLResolveInfo | string, options?: Options) => Promise<T> ,
    createVideoUploadStatusLogItem: <T = VideoUploadStatusLogItem>(args: { data: VideoUploadStatusLogItemCreateInput }, info?: GraphQLResolveInfo | string, options?: Options) => Promise<T> ,
    createConversationBlock: <T = ConversationBlock>(args: { data: ConversationBlockCreateInput }, info?: GraphQLResolveInfo | string, options?: Options) => Promise<T> ,
    createDate: <T = Date>(args: { data: DateCreateInput }, info?: GraphQLResolveInfo | string, options?: Options) => Promise<T> ,
    createVideoConversation: <T = VideoConversation>(args: { data: VideoConversationCreateInput }, info?: GraphQLResolveInfo | string, options?: Options) => Promise<T> ,
    createSpeaker: <T = Speaker>(args: { data: SpeakerCreateInput }, info?: GraphQLResolveInfo | string, options?: Options) => Promise<T> ,
    createUser: <T = User>(args: { data: UserCreateInput }, info?: GraphQLResolveInfo | string, options?: Options) => Promise<T> ,
    updateVideoUpload: <T = VideoUpload | null>(args: { data: VideoUploadUpdateInput, where: VideoUploadWhereUniqueInput }, info?: GraphQLResolveInfo | string, options?: Options) => Promise<T> ,
    updateVideoUploadStorageLink: <T = VideoUploadStorageLink | null>(args: { data: VideoUploadStorageLinkUpdateInput, where: VideoUploadStorageLinkWhereUniqueInput }, info?: GraphQLResolveInfo | string, options?: Options) => Promise<T> ,
    updateVideoUploadMetadata: <T = VideoUploadMetadata | null>(args: { data: VideoUploadMetadataUpdateInput, where: VideoUploadMetadataWhereUniqueInput }, info?: GraphQLResolveInfo | string, options?: Options) => Promise<T> ,
    updateVideoUploadAdminMetadata: <T = VideoUploadAdminMetadata | null>(args: { data: VideoUploadAdminMetadataUpdateInput, where: VideoUploadAdminMetadataWhereUniqueInput }, info?: GraphQLResolveInfo | string, options?: Options) => Promise<T> ,
    updateVideoUploadStatusLogItem: <T = VideoUploadStatusLogItem | null>(args: { data: VideoUploadStatusLogItemUpdateInput, where: VideoUploadStatusLogItemWhereUniqueInput }, info?: GraphQLResolveInfo | string, options?: Options) => Promise<T> ,
    updateVideoConversation: <T = VideoConversation | null>(args: { data: VideoConversationUpdateInput, where: VideoConversationWhereUniqueInput }, info?: GraphQLResolveInfo | string, options?: Options) => Promise<T> ,
    updateSpeaker: <T = Speaker | null>(args: { data: SpeakerUpdateInput, where: SpeakerWhereUniqueInput }, info?: GraphQLResolveInfo | string, options?: Options) => Promise<T> ,
    updateUser: <T = User | null>(args: { data: UserUpdateInput, where: UserWhereUniqueInput }, info?: GraphQLResolveInfo | string, options?: Options) => Promise<T> ,
    deleteVideoUpload: <T = VideoUpload | null>(args: { where: VideoUploadWhereUniqueInput }, info?: GraphQLResolveInfo | string, options?: Options) => Promise<T> ,
    deleteVideoUploadStorageLink: <T = VideoUploadStorageLink | null>(args: { where: VideoUploadStorageLinkWhereUniqueInput }, info?: GraphQLResolveInfo | string, options?: Options) => Promise<T> ,
    deleteVideoUploadMetadata: <T = VideoUploadMetadata | null>(args: { where: VideoUploadMetadataWhereUniqueInput }, info?: GraphQLResolveInfo | string, options?: Options) => Promise<T> ,
    deleteVideoUploadAdminMetadata: <T = VideoUploadAdminMetadata | null>(args: { where: VideoUploadAdminMetadataWhereUniqueInput }, info?: GraphQLResolveInfo | string, options?: Options) => Promise<T> ,
    deleteVideoUploadStatusLogItem: <T = VideoUploadStatusLogItem | null>(args: { where: VideoUploadStatusLogItemWhereUniqueInput }, info?: GraphQLResolveInfo | string, options?: Options) => Promise<T> ,
    deleteVideoConversation: <T = VideoConversation | null>(args: { where: VideoConversationWhereUniqueInput }, info?: GraphQLResolveInfo | string, options?: Options) => Promise<T> ,
    deleteSpeaker: <T = Speaker | null>(args: { where: SpeakerWhereUniqueInput }, info?: GraphQLResolveInfo | string, options?: Options) => Promise<T> ,
    deleteUser: <T = User | null>(args: { where: UserWhereUniqueInput }, info?: GraphQLResolveInfo | string, options?: Options) => Promise<T> ,
    upsertVideoUpload: <T = VideoUpload>(args: { where: VideoUploadWhereUniqueInput, create: VideoUploadCreateInput, update: VideoUploadUpdateInput }, info?: GraphQLResolveInfo | string, options?: Options) => Promise<T> ,
    upsertVideoUploadStorageLink: <T = VideoUploadStorageLink>(args: { where: VideoUploadStorageLinkWhereUniqueInput, create: VideoUploadStorageLinkCreateInput, update: VideoUploadStorageLinkUpdateInput }, info?: GraphQLResolveInfo | string, options?: Options) => Promise<T> ,
    upsertVideoUploadMetadata: <T = VideoUploadMetadata>(args: { where: VideoUploadMetadataWhereUniqueInput, create: VideoUploadMetadataCreateInput, update: VideoUploadMetadataUpdateInput }, info?: GraphQLResolveInfo | string, options?: Options) => Promise<T> ,
    upsertVideoUploadAdminMetadata: <T = VideoUploadAdminMetadata>(args: { where: VideoUploadAdminMetadataWhereUniqueInput, create: VideoUploadAdminMetadataCreateInput, update: VideoUploadAdminMetadataUpdateInput }, info?: GraphQLResolveInfo | string, options?: Options) => Promise<T> ,
    upsertVideoUploadStatusLogItem: <T = VideoUploadStatusLogItem>(args: { where: VideoUploadStatusLogItemWhereUniqueInput, create: VideoUploadStatusLogItemCreateInput, update: VideoUploadStatusLogItemUpdateInput }, info?: GraphQLResolveInfo | string, options?: Options) => Promise<T> ,
    upsertVideoConversation: <T = VideoConversation>(args: { where: VideoConversationWhereUniqueInput, create: VideoConversationCreateInput, update: VideoConversationUpdateInput }, info?: GraphQLResolveInfo | string, options?: Options) => Promise<T> ,
    upsertSpeaker: <T = Speaker>(args: { where: SpeakerWhereUniqueInput, create: SpeakerCreateInput, update: SpeakerUpdateInput }, info?: GraphQLResolveInfo | string, options?: Options) => Promise<T> ,
    upsertUser: <T = User>(args: { where: UserWhereUniqueInput, create: UserCreateInput, update: UserUpdateInput }, info?: GraphQLResolveInfo | string, options?: Options) => Promise<T> ,
    updateManyVideoUploads: <T = BatchPayload>(args: { data: VideoUploadUpdateInput, where?: VideoUploadWhereInput }, info?: GraphQLResolveInfo | string, options?: Options) => Promise<T> ,
    updateManyVideoUploadStorageLinks: <T = BatchPayload>(args: { data: VideoUploadStorageLinkUpdateInput, where?: VideoUploadStorageLinkWhereInput }, info?: GraphQLResolveInfo | string, options?: Options) => Promise<T> ,
    updateManyVideoUploadMetadatas: <T = BatchPayload>(args: { data: VideoUploadMetadataUpdateInput, where?: VideoUploadMetadataWhereInput }, info?: GraphQLResolveInfo | string, options?: Options) => Promise<T> ,
    updateManyVideoUploadAdminMetadatas: <T = BatchPayload>(args: { data: VideoUploadAdminMetadataUpdateInput, where?: VideoUploadAdminMetadataWhereInput }, info?: GraphQLResolveInfo | string, options?: Options) => Promise<T> ,
    updateManyVideoUploadStatusLogItems: <T = BatchPayload>(args: { data: VideoUploadStatusLogItemUpdateInput, where?: VideoUploadStatusLogItemWhereInput }, info?: GraphQLResolveInfo | string, options?: Options) => Promise<T> ,
    updateManyConversationBlocks: <T = BatchPayload>(args: { data: ConversationBlockUpdateInput, where?: ConversationBlockWhereInput }, info?: GraphQLResolveInfo | string, options?: Options) => Promise<T> ,
    updateManyDates: <T = BatchPayload>(args: { data: DateUpdateInput, where?: DateWhereInput }, info?: GraphQLResolveInfo | string, options?: Options) => Promise<T> ,
    updateManyVideoConversations: <T = BatchPayload>(args: { data: VideoConversationUpdateInput, where?: VideoConversationWhereInput }, info?: GraphQLResolveInfo | string, options?: Options) => Promise<T> ,
    updateManySpeakers: <T = BatchPayload>(args: { data: SpeakerUpdateInput, where?: SpeakerWhereInput }, info?: GraphQLResolveInfo | string, options?: Options) => Promise<T> ,
    updateManyUsers: <T = BatchPayload>(args: { data: UserUpdateInput, where?: UserWhereInput }, info?: GraphQLResolveInfo | string, options?: Options) => Promise<T> ,
    deleteManyVideoUploads: <T = BatchPayload>(args: { where?: VideoUploadWhereInput }, info?: GraphQLResolveInfo | string, options?: Options) => Promise<T> ,
    deleteManyVideoUploadStorageLinks: <T = BatchPayload>(args: { where?: VideoUploadStorageLinkWhereInput }, info?: GraphQLResolveInfo | string, options?: Options) => Promise<T> ,
    deleteManyVideoUploadMetadatas: <T = BatchPayload>(args: { where?: VideoUploadMetadataWhereInput }, info?: GraphQLResolveInfo | string, options?: Options) => Promise<T> ,
    deleteManyVideoUploadAdminMetadatas: <T = BatchPayload>(args: { where?: VideoUploadAdminMetadataWhereInput }, info?: GraphQLResolveInfo | string, options?: Options) => Promise<T> ,
    deleteManyVideoUploadStatusLogItems: <T = BatchPayload>(args: { where?: VideoUploadStatusLogItemWhereInput }, info?: GraphQLResolveInfo | string, options?: Options) => Promise<T> ,
    deleteManyConversationBlocks: <T = BatchPayload>(args: { where?: ConversationBlockWhereInput }, info?: GraphQLResolveInfo | string, options?: Options) => Promise<T> ,
    deleteManyDates: <T = BatchPayload>(args: { where?: DateWhereInput }, info?: GraphQLResolveInfo | string, options?: Options) => Promise<T> ,
    deleteManyVideoConversations: <T = BatchPayload>(args: { where?: VideoConversationWhereInput }, info?: GraphQLResolveInfo | string, options?: Options) => Promise<T> ,
    deleteManySpeakers: <T = BatchPayload>(args: { where?: SpeakerWhereInput }, info?: GraphQLResolveInfo | string, options?: Options) => Promise<T> ,
    deleteManyUsers: <T = BatchPayload>(args: { where?: UserWhereInput }, info?: GraphQLResolveInfo | string, options?: Options) => Promise<T> 
  }

export interface Subscription {
    videoUpload: <T = VideoUploadSubscriptionPayload | null>(args: { where?: VideoUploadSubscriptionWhereInput }, info?: GraphQLResolveInfo | string, options?: Options) => Promise<AsyncIterator<T>> ,
    videoUploadStorageLink: <T = VideoUploadStorageLinkSubscriptionPayload | null>(args: { where?: VideoUploadStorageLinkSubscriptionWhereInput }, info?: GraphQLResolveInfo | string, options?: Options) => Promise<AsyncIterator<T>> ,
    videoUploadMetadata: <T = VideoUploadMetadataSubscriptionPayload | null>(args: { where?: VideoUploadMetadataSubscriptionWhereInput }, info?: GraphQLResolveInfo | string, options?: Options) => Promise<AsyncIterator<T>> ,
    videoUploadAdminMetadata: <T = VideoUploadAdminMetadataSubscriptionPayload | null>(args: { where?: VideoUploadAdminMetadataSubscriptionWhereInput }, info?: GraphQLResolveInfo | string, options?: Options) => Promise<AsyncIterator<T>> ,
    videoUploadStatusLogItem: <T = VideoUploadStatusLogItemSubscriptionPayload | null>(args: { where?: VideoUploadStatusLogItemSubscriptionWhereInput }, info?: GraphQLResolveInfo | string, options?: Options) => Promise<AsyncIterator<T>> ,
    conversationBlock: <T = ConversationBlockSubscriptionPayload | null>(args: { where?: ConversationBlockSubscriptionWhereInput }, info?: GraphQLResolveInfo | string, options?: Options) => Promise<AsyncIterator<T>> ,
    date: <T = DateSubscriptionPayload | null>(args: { where?: DateSubscriptionWhereInput }, info?: GraphQLResolveInfo | string, options?: Options) => Promise<AsyncIterator<T>> ,
    videoConversation: <T = VideoConversationSubscriptionPayload | null>(args: { where?: VideoConversationSubscriptionWhereInput }, info?: GraphQLResolveInfo | string, options?: Options) => Promise<AsyncIterator<T>> ,
    speaker: <T = SpeakerSubscriptionPayload | null>(args: { where?: SpeakerSubscriptionWhereInput }, info?: GraphQLResolveInfo | string, options?: Options) => Promise<AsyncIterator<T>> ,
    user: <T = UserSubscriptionPayload | null>(args: { where?: UserSubscriptionWhereInput }, info?: GraphQLResolveInfo | string, options?: Options) => Promise<AsyncIterator<T>> 
  }

export interface Exists {
  VideoUpload: (where?: VideoUploadWhereInput) => Promise<boolean>
  VideoUploadStorageLink: (where?: VideoUploadStorageLinkWhereInput) => Promise<boolean>
  VideoUploadMetadata: (where?: VideoUploadMetadataWhereInput) => Promise<boolean>
  VideoUploadAdminMetadata: (where?: VideoUploadAdminMetadataWhereInput) => Promise<boolean>
  VideoUploadStatusLogItem: (where?: VideoUploadStatusLogItemWhereInput) => Promise<boolean>
  ConversationBlock: (where?: ConversationBlockWhereInput) => Promise<boolean>
  Date: (where?: DateWhereInput) => Promise<boolean>
  VideoConversation: (where?: VideoConversationWhereInput) => Promise<boolean>
  Speaker: (where?: SpeakerWhereInput) => Promise<boolean>
  User: (where?: UserWhereInput) => Promise<boolean>
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

type AggregateConversationBlock {
  count: Int!
}

type AggregateDate {
  count: Int!
}

type AggregateSpeaker {
  count: Int!
}

type AggregateUser {
  count: Int!
}

type AggregateVideoConversation {
  count: Int!
}

type AggregateVideoUpload {
  count: Int!
}

type AggregateVideoUploadAdminMetadata {
  count: Int!
}

type AggregateVideoUploadMetadata {
  count: Int!
}

type AggregateVideoUploadStatusLogItem {
  count: Int!
}

type AggregateVideoUploadStorageLink {
  count: Int!
}

type BatchPayload {
  """The number of nodes that have been affected by the Batch operation."""
  count: Long!
}

type ConversationBlock {
  speaker(where: SpeakerWhereInput): Speaker
  start: Float!
  end: Float!
  content: String!
}

"""A connection to a list of items."""
type ConversationBlockConnection {
  """Information to aid in pagination."""
  pageInfo: PageInfo!

  """A list of edges."""
  edges: [ConversationBlockEdge]!
  aggregate: AggregateConversationBlock!
}

input ConversationBlockCreateInput {
  start: Float!
  end: Float!
  content: String!
  speaker: SpeakerCreateOneInput
}

input ConversationBlockCreateManyInput {
  create: [ConversationBlockCreateInput!]
}

"""An edge in a connection."""
type ConversationBlockEdge {
  """The item at the end of the edge."""
  node: ConversationBlock!

  """A cursor for use in pagination."""
  cursor: String!
}

enum ConversationBlockOrderByInput {
  start_ASC
  start_DESC
  end_ASC
  end_DESC
  content_ASC
  content_DESC
  id_ASC
  id_DESC
  updatedAt_ASC
  updatedAt_DESC
  createdAt_ASC
  createdAt_DESC
}

type ConversationBlockPreviousValues {
  start: Float!
  end: Float!
  content: String!
}

type ConversationBlockSubscriptionPayload {
  mutation: MutationType!
  node: ConversationBlock
  updatedFields: [String!]
  previousValues: ConversationBlockPreviousValues
}

input ConversationBlockSubscriptionWhereInput {
  """Logical AND on all given filters."""
  AND: [ConversationBlockSubscriptionWhereInput!]

  """Logical OR on all given filters."""
  OR: [ConversationBlockSubscriptionWhereInput!]

  """Logical NOT on all given filters combined by AND."""
  NOT: [ConversationBlockSubscriptionWhereInput!]

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
  node: ConversationBlockWhereInput
}

input ConversationBlockUpdateInput {
  start: Float
  end: Float
  content: String
  speaker: SpeakerUpdateOneInput
}

input ConversationBlockUpdateManyInput {
  create: [ConversationBlockCreateInput!]
}

input ConversationBlockWhereInput {
  """Logical AND on all given filters."""
  AND: [ConversationBlockWhereInput!]

  """Logical OR on all given filters."""
  OR: [ConversationBlockWhereInput!]

  """Logical NOT on all given filters combined by AND."""
  NOT: [ConversationBlockWhereInput!]
  start: Float

  """All values that are not equal to given value."""
  start_not: Float

  """All values that are contained in given list."""
  start_in: [Float!]

  """All values that are not contained in given list."""
  start_not_in: [Float!]

  """All values less than the given value."""
  start_lt: Float

  """All values less than or equal the given value."""
  start_lte: Float

  """All values greater than the given value."""
  start_gt: Float

  """All values greater than or equal the given value."""
  start_gte: Float
  end: Float

  """All values that are not equal to given value."""
  end_not: Float

  """All values that are contained in given list."""
  end_in: [Float!]

  """All values that are not contained in given list."""
  end_not_in: [Float!]

  """All values less than the given value."""
  end_lt: Float

  """All values less than or equal the given value."""
  end_lte: Float

  """All values greater than the given value."""
  end_gt: Float

  """All values greater than or equal the given value."""
  end_gte: Float
  content: String

  """All values that are not equal to given value."""
  content_not: String

  """All values that are contained in given list."""
  content_in: [String!]

  """All values that are not contained in given list."""
  content_not_in: [String!]

  """All values less than the given value."""
  content_lt: String

  """All values less than or equal the given value."""
  content_lte: String

  """All values greater than the given value."""
  content_gt: String

  """All values greater than or equal the given value."""
  content_gte: String

  """All values containing the given string."""
  content_contains: String

  """All values not containing the given string."""
  content_not_contains: String

  """All values starting with the given string."""
  content_starts_with: String

  """All values not starting with the given string."""
  content_not_starts_with: String

  """All values ending with the given string."""
  content_ends_with: String

  """All values not ending with the given string."""
  content_not_ends_with: String
  speaker: SpeakerWhereInput
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
}

"""
The \`Long\` scalar type represents non-fractional signed whole numeric values.
Long can represent values between -(2^63) and 2^63 - 1.
"""
scalar Long

type Mutation {
  createVideoUpload(data: VideoUploadCreateInput!): VideoUpload!
  createVideoUploadStorageLink(data: VideoUploadStorageLinkCreateInput!): VideoUploadStorageLink!
  createVideoUploadMetadata(data: VideoUploadMetadataCreateInput!): VideoUploadMetadata!
  createVideoUploadAdminMetadata(data: VideoUploadAdminMetadataCreateInput!): VideoUploadAdminMetadata!
  createVideoUploadStatusLogItem(data: VideoUploadStatusLogItemCreateInput!): VideoUploadStatusLogItem!
  createConversationBlock(data: ConversationBlockCreateInput!): ConversationBlock!
  createDate(data: DateCreateInput!): Date!
  createVideoConversation(data: VideoConversationCreateInput!): VideoConversation!
  createSpeaker(data: SpeakerCreateInput!): Speaker!
  createUser(data: UserCreateInput!): User!
  updateVideoUpload(data: VideoUploadUpdateInput!, where: VideoUploadWhereUniqueInput!): VideoUpload
  updateVideoUploadStorageLink(data: VideoUploadStorageLinkUpdateInput!, where: VideoUploadStorageLinkWhereUniqueInput!): VideoUploadStorageLink
  updateVideoUploadMetadata(data: VideoUploadMetadataUpdateInput!, where: VideoUploadMetadataWhereUniqueInput!): VideoUploadMetadata
  updateVideoUploadAdminMetadata(data: VideoUploadAdminMetadataUpdateInput!, where: VideoUploadAdminMetadataWhereUniqueInput!): VideoUploadAdminMetadata
  updateVideoUploadStatusLogItem(data: VideoUploadStatusLogItemUpdateInput!, where: VideoUploadStatusLogItemWhereUniqueInput!): VideoUploadStatusLogItem
  updateVideoConversation(data: VideoConversationUpdateInput!, where: VideoConversationWhereUniqueInput!): VideoConversation
  updateSpeaker(data: SpeakerUpdateInput!, where: SpeakerWhereUniqueInput!): Speaker
  updateUser(data: UserUpdateInput!, where: UserWhereUniqueInput!): User
  deleteVideoUpload(where: VideoUploadWhereUniqueInput!): VideoUpload
  deleteVideoUploadStorageLink(where: VideoUploadStorageLinkWhereUniqueInput!): VideoUploadStorageLink
  deleteVideoUploadMetadata(where: VideoUploadMetadataWhereUniqueInput!): VideoUploadMetadata
  deleteVideoUploadAdminMetadata(where: VideoUploadAdminMetadataWhereUniqueInput!): VideoUploadAdminMetadata
  deleteVideoUploadStatusLogItem(where: VideoUploadStatusLogItemWhereUniqueInput!): VideoUploadStatusLogItem
  deleteVideoConversation(where: VideoConversationWhereUniqueInput!): VideoConversation
  deleteSpeaker(where: SpeakerWhereUniqueInput!): Speaker
  deleteUser(where: UserWhereUniqueInput!): User
  upsertVideoUpload(where: VideoUploadWhereUniqueInput!, create: VideoUploadCreateInput!, update: VideoUploadUpdateInput!): VideoUpload!
  upsertVideoUploadStorageLink(where: VideoUploadStorageLinkWhereUniqueInput!, create: VideoUploadStorageLinkCreateInput!, update: VideoUploadStorageLinkUpdateInput!): VideoUploadStorageLink!
  upsertVideoUploadMetadata(where: VideoUploadMetadataWhereUniqueInput!, create: VideoUploadMetadataCreateInput!, update: VideoUploadMetadataUpdateInput!): VideoUploadMetadata!
  upsertVideoUploadAdminMetadata(where: VideoUploadAdminMetadataWhereUniqueInput!, create: VideoUploadAdminMetadataCreateInput!, update: VideoUploadAdminMetadataUpdateInput!): VideoUploadAdminMetadata!
  upsertVideoUploadStatusLogItem(where: VideoUploadStatusLogItemWhereUniqueInput!, create: VideoUploadStatusLogItemCreateInput!, update: VideoUploadStatusLogItemUpdateInput!): VideoUploadStatusLogItem!
  upsertVideoConversation(where: VideoConversationWhereUniqueInput!, create: VideoConversationCreateInput!, update: VideoConversationUpdateInput!): VideoConversation!
  upsertSpeaker(where: SpeakerWhereUniqueInput!, create: SpeakerCreateInput!, update: SpeakerUpdateInput!): Speaker!
  upsertUser(where: UserWhereUniqueInput!, create: UserCreateInput!, update: UserUpdateInput!): User!
  updateManyVideoUploads(data: VideoUploadUpdateInput!, where: VideoUploadWhereInput): BatchPayload!
  updateManyVideoUploadStorageLinks(data: VideoUploadStorageLinkUpdateInput!, where: VideoUploadStorageLinkWhereInput): BatchPayload!
  updateManyVideoUploadMetadatas(data: VideoUploadMetadataUpdateInput!, where: VideoUploadMetadataWhereInput): BatchPayload!
  updateManyVideoUploadAdminMetadatas(data: VideoUploadAdminMetadataUpdateInput!, where: VideoUploadAdminMetadataWhereInput): BatchPayload!
  updateManyVideoUploadStatusLogItems(data: VideoUploadStatusLogItemUpdateInput!, where: VideoUploadStatusLogItemWhereInput): BatchPayload!
  updateManyConversationBlocks(data: ConversationBlockUpdateInput!, where: ConversationBlockWhereInput): BatchPayload!
  updateManyDates(data: DateUpdateInput!, where: DateWhereInput): BatchPayload!
  updateManyVideoConversations(data: VideoConversationUpdateInput!, where: VideoConversationWhereInput): BatchPayload!
  updateManySpeakers(data: SpeakerUpdateInput!, where: SpeakerWhereInput): BatchPayload!
  updateManyUsers(data: UserUpdateInput!, where: UserWhereInput): BatchPayload!
  deleteManyVideoUploads(where: VideoUploadWhereInput): BatchPayload!
  deleteManyVideoUploadStorageLinks(where: VideoUploadStorageLinkWhereInput): BatchPayload!
  deleteManyVideoUploadMetadatas(where: VideoUploadMetadataWhereInput): BatchPayload!
  deleteManyVideoUploadAdminMetadatas(where: VideoUploadAdminMetadataWhereInput): BatchPayload!
  deleteManyVideoUploadStatusLogItems(where: VideoUploadStatusLogItemWhereInput): BatchPayload!
  deleteManyConversationBlocks(where: ConversationBlockWhereInput): BatchPayload!
  deleteManyDates(where: DateWhereInput): BatchPayload!
  deleteManyVideoConversations(where: VideoConversationWhereInput): BatchPayload!
  deleteManySpeakers(where: SpeakerWhereInput): BatchPayload!
  deleteManyUsers(where: UserWhereInput): BatchPayload!
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

type Query {
  videoUploads(where: VideoUploadWhereInput, orderBy: VideoUploadOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): [VideoUpload]!
  videoUploadStorageLinks(where: VideoUploadStorageLinkWhereInput, orderBy: VideoUploadStorageLinkOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): [VideoUploadStorageLink]!
  videoUploadMetadatas(where: VideoUploadMetadataWhereInput, orderBy: VideoUploadMetadataOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): [VideoUploadMetadata]!
  videoUploadAdminMetadatas(where: VideoUploadAdminMetadataWhereInput, orderBy: VideoUploadAdminMetadataOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): [VideoUploadAdminMetadata]!
  videoUploadStatusLogItems(where: VideoUploadStatusLogItemWhereInput, orderBy: VideoUploadStatusLogItemOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): [VideoUploadStatusLogItem]!
  conversationBlocks(where: ConversationBlockWhereInput, orderBy: ConversationBlockOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): [ConversationBlock]!
  dates(where: DateWhereInput, orderBy: DateOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): [Date]!
  videoConversations(where: VideoConversationWhereInput, orderBy: VideoConversationOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): [VideoConversation]!
  speakers(where: SpeakerWhereInput, orderBy: SpeakerOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): [Speaker]!
  users(where: UserWhereInput, orderBy: UserOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): [User]!
  videoUpload(where: VideoUploadWhereUniqueInput!): VideoUpload
  videoUploadStorageLink(where: VideoUploadStorageLinkWhereUniqueInput!): VideoUploadStorageLink
  videoUploadMetadata(where: VideoUploadMetadataWhereUniqueInput!): VideoUploadMetadata
  videoUploadAdminMetadata(where: VideoUploadAdminMetadataWhereUniqueInput!): VideoUploadAdminMetadata
  videoUploadStatusLogItem(where: VideoUploadStatusLogItemWhereUniqueInput!): VideoUploadStatusLogItem
  videoConversation(where: VideoConversationWhereUniqueInput!): VideoConversation
  speaker(where: SpeakerWhereUniqueInput!): Speaker
  user(where: UserWhereUniqueInput!): User
  videoUploadsConnection(where: VideoUploadWhereInput, orderBy: VideoUploadOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): VideoUploadConnection!
  videoUploadStorageLinksConnection(where: VideoUploadStorageLinkWhereInput, orderBy: VideoUploadStorageLinkOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): VideoUploadStorageLinkConnection!
  videoUploadMetadatasConnection(where: VideoUploadMetadataWhereInput, orderBy: VideoUploadMetadataOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): VideoUploadMetadataConnection!
  videoUploadAdminMetadatasConnection(where: VideoUploadAdminMetadataWhereInput, orderBy: VideoUploadAdminMetadataOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): VideoUploadAdminMetadataConnection!
  videoUploadStatusLogItemsConnection(where: VideoUploadStatusLogItemWhereInput, orderBy: VideoUploadStatusLogItemOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): VideoUploadStatusLogItemConnection!
  conversationBlocksConnection(where: ConversationBlockWhereInput, orderBy: ConversationBlockOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): ConversationBlockConnection!
  datesConnection(where: DateWhereInput, orderBy: DateOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): DateConnection!
  videoConversationsConnection(where: VideoConversationWhereInput, orderBy: VideoConversationOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): VideoConversationConnection!
  speakersConnection(where: SpeakerWhereInput, orderBy: SpeakerOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): SpeakerConnection!
  usersConnection(where: UserWhereInput, orderBy: UserOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): UserConnection!

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

type Speaker implements Node {
  id: ID!
  name: String!
  avatarPath: String
  title: String
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
  avatarPath: String
  title: String
}

input SpeakerCreateOneInput {
  create: SpeakerCreateInput
  connect: SpeakerWhereUniqueInput
}

"""An edge in a connection."""
type SpeakerEdge {
  """The item at the end of the edge."""
  node: Speaker!

  """A cursor for use in pagination."""
  cursor: String!
}

enum SpeakerOrderByInput {
  id_ASC
  id_DESC
  name_ASC
  name_DESC
  avatarPath_ASC
  avatarPath_DESC
  title_ASC
  title_DESC
  updatedAt_ASC
  updatedAt_DESC
  createdAt_ASC
  createdAt_DESC
}

type SpeakerPreviousValues {
  id: ID!
  name: String!
  avatarPath: String
  title: String
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

input SpeakerUpdateDataInput {
  name: String
  avatarPath: String
  title: String
}

input SpeakerUpdateInput {
  name: String
  avatarPath: String
  title: String
}

input SpeakerUpdateOneInput {
  create: SpeakerCreateInput
  connect: SpeakerWhereUniqueInput
  disconnect: Boolean
  delete: Boolean
  update: SpeakerUpdateDataInput
  upsert: SpeakerUpsertNestedInput
}

input SpeakerUpsertNestedInput {
  update: SpeakerUpdateDataInput!
  create: SpeakerCreateInput!
}

input SpeakerWhereInput {
  """Logical AND on all given filters."""
  AND: [SpeakerWhereInput!]

  """Logical OR on all given filters."""
  OR: [SpeakerWhereInput!]

  """Logical NOT on all given filters combined by AND."""
  NOT: [SpeakerWhereInput!]
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
  id: ID
  name: String
}

type Subscription {
  videoUpload(where: VideoUploadSubscriptionWhereInput): VideoUploadSubscriptionPayload
  videoUploadStorageLink(where: VideoUploadStorageLinkSubscriptionWhereInput): VideoUploadStorageLinkSubscriptionPayload
  videoUploadMetadata(where: VideoUploadMetadataSubscriptionWhereInput): VideoUploadMetadataSubscriptionPayload
  videoUploadAdminMetadata(where: VideoUploadAdminMetadataSubscriptionWhereInput): VideoUploadAdminMetadataSubscriptionPayload
  videoUploadStatusLogItem(where: VideoUploadStatusLogItemSubscriptionWhereInput): VideoUploadStatusLogItemSubscriptionPayload
  conversationBlock(where: ConversationBlockSubscriptionWhereInput): ConversationBlockSubscriptionPayload
  date(where: DateSubscriptionWhereInput): DateSubscriptionPayload
  videoConversation(where: VideoConversationSubscriptionWhereInput): VideoConversationSubscriptionPayload
  speaker(where: SpeakerSubscriptionWhereInput): SpeakerSubscriptionPayload
  user(where: UserSubscriptionWhereInput): UserSubscriptionPayload
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
  disconnect: Boolean
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
}

input UserWhereUniqueInput {
  id: ID
  auth0Id: String
}

type VideoConversation implements Node {
  id: ID!
  createdAt: DateTime!
  createdBy(where: UserWhereInput): User
  draft: Boolean
  blocks(where: ConversationBlockWhereInput, orderBy: ConversationBlockOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): [ConversationBlock!]
}

"""A connection to a list of items."""
type VideoConversationConnection {
  """Information to aid in pagination."""
  pageInfo: PageInfo!

  """A list of edges."""
  edges: [VideoConversationEdge]!
  aggregate: AggregateVideoConversation!
}

input VideoConversationCreateInput {
  draft: Boolean
  createdBy: UserCreateOneInput
  blocks: ConversationBlockCreateManyInput
}

input VideoConversationCreateManyInput {
  create: [VideoConversationCreateInput!]
  connect: [VideoConversationWhereUniqueInput!]
}

"""An edge in a connection."""
type VideoConversationEdge {
  """The item at the end of the edge."""
  node: VideoConversation!

  """A cursor for use in pagination."""
  cursor: String!
}

enum VideoConversationOrderByInput {
  id_ASC
  id_DESC
  createdAt_ASC
  createdAt_DESC
  draft_ASC
  draft_DESC
  updatedAt_ASC
  updatedAt_DESC
}

type VideoConversationPreviousValues {
  id: ID!
  createdAt: DateTime!
  draft: Boolean
}

type VideoConversationSubscriptionPayload {
  mutation: MutationType!
  node: VideoConversation
  updatedFields: [String!]
  previousValues: VideoConversationPreviousValues
}

input VideoConversationSubscriptionWhereInput {
  """Logical AND on all given filters."""
  AND: [VideoConversationSubscriptionWhereInput!]

  """Logical OR on all given filters."""
  OR: [VideoConversationSubscriptionWhereInput!]

  """Logical NOT on all given filters combined by AND."""
  NOT: [VideoConversationSubscriptionWhereInput!]

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
  node: VideoConversationWhereInput
}

input VideoConversationUpdateDataInput {
  draft: Boolean
  createdBy: UserUpdateOneInput
  blocks: ConversationBlockUpdateManyInput
}

input VideoConversationUpdateInput {
  draft: Boolean
  createdBy: UserUpdateOneInput
  blocks: ConversationBlockUpdateManyInput
}

input VideoConversationUpdateManyInput {
  create: [VideoConversationCreateInput!]
  connect: [VideoConversationWhereUniqueInput!]
  disconnect: [VideoConversationWhereUniqueInput!]
  delete: [VideoConversationWhereUniqueInput!]
  update: [VideoConversationUpdateWithWhereUniqueNestedInput!]
  upsert: [VideoConversationUpsertWithWhereUniqueNestedInput!]
}

input VideoConversationUpdateWithWhereUniqueNestedInput {
  where: VideoConversationWhereUniqueInput!
  data: VideoConversationUpdateDataInput!
}

input VideoConversationUpsertWithWhereUniqueNestedInput {
  where: VideoConversationWhereUniqueInput!
  update: VideoConversationUpdateDataInput!
  create: VideoConversationCreateInput!
}

input VideoConversationWhereInput {
  """Logical AND on all given filters."""
  AND: [VideoConversationWhereInput!]

  """Logical OR on all given filters."""
  OR: [VideoConversationWhereInput!]

  """Logical NOT on all given filters combined by AND."""
  NOT: [VideoConversationWhereInput!]
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
  draft: Boolean

  """All values that are not equal to given value."""
  draft_not: Boolean
  createdBy: UserWhereInput
  blocks_every: ConversationBlockWhereInput
  blocks_some: ConversationBlockWhereInput
  blocks_none: ConversationBlockWhereInput
}

input VideoConversationWhereUniqueInput {
  id: ID
}

type VideoUpload implements Node {
  id: ID!
  adminMetadata(where: VideoUploadAdminMetadataWhereInput): VideoUploadAdminMetadata
  createdAt: DateTime!
  updatedAt: DateTime!
  metadata(where: VideoUploadMetadataWhereInput): VideoUploadMetadata!
  publishedBy(where: UserWhereInput): User
  published: Boolean!
  statusLog(where: VideoUploadStatusLogItemWhereInput, orderBy: VideoUploadStatusLogItemOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): [VideoUploadStatusLogItem!]
  storageLinks(where: VideoUploadStorageLinkWhereInput, orderBy: VideoUploadStorageLinkOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): [VideoUploadStorageLink!]
  submitedBy(where: UserWhereInput): User!
  submitedUrl: String!
}

type VideoUploadAdminMetadata implements Node {
  id: ID!
  videoUpload(where: VideoUploadWhereInput): VideoUpload!
  advertisingEnabled: Boolean!
}

"""A connection to a list of items."""
type VideoUploadAdminMetadataConnection {
  """Information to aid in pagination."""
  pageInfo: PageInfo!

  """A list of edges."""
  edges: [VideoUploadAdminMetadataEdge]!
  aggregate: AggregateVideoUploadAdminMetadata!
}

input VideoUploadAdminMetadataCreateInput {
  advertisingEnabled: Boolean
  videoUpload: VideoUploadCreateOneWithoutAdminMetadataInput!
}

input VideoUploadAdminMetadataCreateOneWithoutVideoUploadInput {
  create: VideoUploadAdminMetadataCreateWithoutVideoUploadInput
  connect: VideoUploadAdminMetadataWhereUniqueInput
}

input VideoUploadAdminMetadataCreateWithoutVideoUploadInput {
  advertisingEnabled: Boolean
}

"""An edge in a connection."""
type VideoUploadAdminMetadataEdge {
  """The item at the end of the edge."""
  node: VideoUploadAdminMetadata!

  """A cursor for use in pagination."""
  cursor: String!
}

enum VideoUploadAdminMetadataOrderByInput {
  id_ASC
  id_DESC
  advertisingEnabled_ASC
  advertisingEnabled_DESC
  updatedAt_ASC
  updatedAt_DESC
  createdAt_ASC
  createdAt_DESC
}

type VideoUploadAdminMetadataPreviousValues {
  id: ID!
  advertisingEnabled: Boolean!
}

type VideoUploadAdminMetadataSubscriptionPayload {
  mutation: MutationType!
  node: VideoUploadAdminMetadata
  updatedFields: [String!]
  previousValues: VideoUploadAdminMetadataPreviousValues
}

input VideoUploadAdminMetadataSubscriptionWhereInput {
  """Logical AND on all given filters."""
  AND: [VideoUploadAdminMetadataSubscriptionWhereInput!]

  """Logical OR on all given filters."""
  OR: [VideoUploadAdminMetadataSubscriptionWhereInput!]

  """Logical NOT on all given filters combined by AND."""
  NOT: [VideoUploadAdminMetadataSubscriptionWhereInput!]

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
  node: VideoUploadAdminMetadataWhereInput
}

input VideoUploadAdminMetadataUpdateInput {
  advertisingEnabled: Boolean
  videoUpload: VideoUploadUpdateOneWithoutAdminMetadataInput
}

input VideoUploadAdminMetadataUpdateOneWithoutVideoUploadInput {
  create: VideoUploadAdminMetadataCreateWithoutVideoUploadInput
  connect: VideoUploadAdminMetadataWhereUniqueInput
  disconnect: Boolean
  delete: Boolean
  update: VideoUploadAdminMetadataUpdateWithoutVideoUploadDataInput
  upsert: VideoUploadAdminMetadataUpsertWithoutVideoUploadInput
}

input VideoUploadAdminMetadataUpdateWithoutVideoUploadDataInput {
  advertisingEnabled: Boolean
}

input VideoUploadAdminMetadataUpsertWithoutVideoUploadInput {
  update: VideoUploadAdminMetadataUpdateWithoutVideoUploadDataInput!
  create: VideoUploadAdminMetadataCreateWithoutVideoUploadInput!
}

input VideoUploadAdminMetadataWhereInput {
  """Logical AND on all given filters."""
  AND: [VideoUploadAdminMetadataWhereInput!]

  """Logical OR on all given filters."""
  OR: [VideoUploadAdminMetadataWhereInput!]

  """Logical NOT on all given filters combined by AND."""
  NOT: [VideoUploadAdminMetadataWhereInput!]
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
  advertisingEnabled: Boolean

  """All values that are not equal to given value."""
  advertisingEnabled_not: Boolean
  videoUpload: VideoUploadWhereInput
}

input VideoUploadAdminMetadataWhereUniqueInput {
  id: ID
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
  published: Boolean
  submitedUrl: String!
  adminMetadata: VideoUploadAdminMetadataCreateOneWithoutVideoUploadInput
  metadata: VideoUploadMetadataCreateOneWithoutVideoUploadInput!
  publishedBy: UserCreateOneInput
  statusLog: VideoUploadStatusLogItemCreateManyWithoutVideoUploadInput
  storageLinks: VideoUploadStorageLinkCreateManyWithoutVideoUploadInput
  submitedBy: UserCreateOneInput!
}

input VideoUploadCreateOneWithoutAdminMetadataInput {
  create: VideoUploadCreateWithoutAdminMetadataInput
  connect: VideoUploadWhereUniqueInput
}

input VideoUploadCreateOneWithoutMetadataInput {
  create: VideoUploadCreateWithoutMetadataInput
  connect: VideoUploadWhereUniqueInput
}

input VideoUploadCreateOneWithoutStatusLogInput {
  create: VideoUploadCreateWithoutStatusLogInput
  connect: VideoUploadWhereUniqueInput
}

input VideoUploadCreateOneWithoutStorageLinksInput {
  create: VideoUploadCreateWithoutStorageLinksInput
  connect: VideoUploadWhereUniqueInput
}

input VideoUploadCreateWithoutAdminMetadataInput {
  published: Boolean
  submitedUrl: String!
  metadata: VideoUploadMetadataCreateOneWithoutVideoUploadInput!
  publishedBy: UserCreateOneInput
  statusLog: VideoUploadStatusLogItemCreateManyWithoutVideoUploadInput
  storageLinks: VideoUploadStorageLinkCreateManyWithoutVideoUploadInput
  submitedBy: UserCreateOneInput!
}

input VideoUploadCreateWithoutMetadataInput {
  published: Boolean
  submitedUrl: String!
  adminMetadata: VideoUploadAdminMetadataCreateOneWithoutVideoUploadInput
  publishedBy: UserCreateOneInput
  statusLog: VideoUploadStatusLogItemCreateManyWithoutVideoUploadInput
  storageLinks: VideoUploadStorageLinkCreateManyWithoutVideoUploadInput
  submitedBy: UserCreateOneInput!
}

input VideoUploadCreateWithoutStatusLogInput {
  published: Boolean
  submitedUrl: String!
  adminMetadata: VideoUploadAdminMetadataCreateOneWithoutVideoUploadInput
  metadata: VideoUploadMetadataCreateOneWithoutVideoUploadInput!
  publishedBy: UserCreateOneInput
  storageLinks: VideoUploadStorageLinkCreateManyWithoutVideoUploadInput
  submitedBy: UserCreateOneInput!
}

input VideoUploadCreateWithoutStorageLinksInput {
  published: Boolean
  submitedUrl: String!
  adminMetadata: VideoUploadAdminMetadataCreateOneWithoutVideoUploadInput
  metadata: VideoUploadMetadataCreateOneWithoutVideoUploadInput!
  publishedBy: UserCreateOneInput
  statusLog: VideoUploadStatusLogItemCreateManyWithoutVideoUploadInput
  submitedBy: UserCreateOneInput!
}

"""An edge in a connection."""
type VideoUploadEdge {
  """The item at the end of the edge."""
  node: VideoUpload!

  """A cursor for use in pagination."""
  cursor: String!
}

enum VideoUploadFileLinkType {
  WEBM
  MP4
  MP4_DASH
  MP4_DASH_MANIFEST
  AUDIO
  THUMBNAIL
}

enum VideoUploadFileLinkVersion {
  WEB
  MASTER
}

enum VideoUploadLogItemEvent {
  DOWNLOAD
  ENCODE
  TRANSCRIPTION
  USER_INPUT
  NLP
  SOCIAL
  THUMBNAIL
}

enum VideoUploadLogItemStatus {
  DISPATCHED
  UPDATE
  STARTED
  FINISHED
  FAILED
  TIMED_OUT
}

type VideoUploadMetadata implements Node {
  id: ID!
  videoUpload(where: VideoUploadWhereInput): VideoUpload!
  title: String
  subtitle: String
  dateRecorded(where: DateWhereInput): Date
  speakers: Int!
  renderStart: Float!
  renderEnd: Float!
  conversations(where: VideoConversationWhereInput, orderBy: VideoConversationOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): [VideoConversation!]
}

"""A connection to a list of items."""
type VideoUploadMetadataConnection {
  """Information to aid in pagination."""
  pageInfo: PageInfo!

  """A list of edges."""
  edges: [VideoUploadMetadataEdge]!
  aggregate: AggregateVideoUploadMetadata!
}

input VideoUploadMetadataCreateInput {
  title: String
  subtitle: String
  speakers: Int
  renderStart: Float
  renderEnd: Float
  videoUpload: VideoUploadCreateOneWithoutMetadataInput!
  dateRecorded: DateCreateOneInput
  conversations: VideoConversationCreateManyInput
}

input VideoUploadMetadataCreateOneWithoutVideoUploadInput {
  create: VideoUploadMetadataCreateWithoutVideoUploadInput
  connect: VideoUploadMetadataWhereUniqueInput
}

input VideoUploadMetadataCreateWithoutVideoUploadInput {
  title: String
  subtitle: String
  speakers: Int
  renderStart: Float
  renderEnd: Float
  dateRecorded: DateCreateOneInput
  conversations: VideoConversationCreateManyInput
}

"""An edge in a connection."""
type VideoUploadMetadataEdge {
  """The item at the end of the edge."""
  node: VideoUploadMetadata!

  """A cursor for use in pagination."""
  cursor: String!
}

enum VideoUploadMetadataOrderByInput {
  id_ASC
  id_DESC
  title_ASC
  title_DESC
  subtitle_ASC
  subtitle_DESC
  speakers_ASC
  speakers_DESC
  renderStart_ASC
  renderStart_DESC
  renderEnd_ASC
  renderEnd_DESC
  updatedAt_ASC
  updatedAt_DESC
  createdAt_ASC
  createdAt_DESC
}

type VideoUploadMetadataPreviousValues {
  id: ID!
  title: String
  subtitle: String
  speakers: Int!
  renderStart: Float!
  renderEnd: Float!
}

type VideoUploadMetadataSubscriptionPayload {
  mutation: MutationType!
  node: VideoUploadMetadata
  updatedFields: [String!]
  previousValues: VideoUploadMetadataPreviousValues
}

input VideoUploadMetadataSubscriptionWhereInput {
  """Logical AND on all given filters."""
  AND: [VideoUploadMetadataSubscriptionWhereInput!]

  """Logical OR on all given filters."""
  OR: [VideoUploadMetadataSubscriptionWhereInput!]

  """Logical NOT on all given filters combined by AND."""
  NOT: [VideoUploadMetadataSubscriptionWhereInput!]

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
  node: VideoUploadMetadataWhereInput
}

input VideoUploadMetadataUpdateInput {
  title: String
  subtitle: String
  speakers: Int
  renderStart: Float
  renderEnd: Float
  videoUpload: VideoUploadUpdateOneWithoutMetadataInput
  dateRecorded: DateUpdateOneInput
  conversations: VideoConversationUpdateManyInput
}

input VideoUploadMetadataUpdateOneWithoutVideoUploadInput {
  create: VideoUploadMetadataCreateWithoutVideoUploadInput
  connect: VideoUploadMetadataWhereUniqueInput
  delete: Boolean
  update: VideoUploadMetadataUpdateWithoutVideoUploadDataInput
  upsert: VideoUploadMetadataUpsertWithoutVideoUploadInput
}

input VideoUploadMetadataUpdateWithoutVideoUploadDataInput {
  title: String
  subtitle: String
  speakers: Int
  renderStart: Float
  renderEnd: Float
  dateRecorded: DateUpdateOneInput
  conversations: VideoConversationUpdateManyInput
}

input VideoUploadMetadataUpsertWithoutVideoUploadInput {
  update: VideoUploadMetadataUpdateWithoutVideoUploadDataInput!
  create: VideoUploadMetadataCreateWithoutVideoUploadInput!
}

input VideoUploadMetadataWhereInput {
  """Logical AND on all given filters."""
  AND: [VideoUploadMetadataWhereInput!]

  """Logical OR on all given filters."""
  OR: [VideoUploadMetadataWhereInput!]

  """Logical NOT on all given filters combined by AND."""
  NOT: [VideoUploadMetadataWhereInput!]
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
  speakers: Int

  """All values that are not equal to given value."""
  speakers_not: Int

  """All values that are contained in given list."""
  speakers_in: [Int!]

  """All values that are not contained in given list."""
  speakers_not_in: [Int!]

  """All values less than the given value."""
  speakers_lt: Int

  """All values less than or equal the given value."""
  speakers_lte: Int

  """All values greater than the given value."""
  speakers_gt: Int

  """All values greater than or equal the given value."""
  speakers_gte: Int
  renderStart: Float

  """All values that are not equal to given value."""
  renderStart_not: Float

  """All values that are contained in given list."""
  renderStart_in: [Float!]

  """All values that are not contained in given list."""
  renderStart_not_in: [Float!]

  """All values less than the given value."""
  renderStart_lt: Float

  """All values less than or equal the given value."""
  renderStart_lte: Float

  """All values greater than the given value."""
  renderStart_gt: Float

  """All values greater than or equal the given value."""
  renderStart_gte: Float
  renderEnd: Float

  """All values that are not equal to given value."""
  renderEnd_not: Float

  """All values that are contained in given list."""
  renderEnd_in: [Float!]

  """All values that are not contained in given list."""
  renderEnd_not_in: [Float!]

  """All values less than the given value."""
  renderEnd_lt: Float

  """All values less than or equal the given value."""
  renderEnd_lte: Float

  """All values greater than the given value."""
  renderEnd_gt: Float

  """All values greater than or equal the given value."""
  renderEnd_gte: Float
  videoUpload: VideoUploadWhereInput
  dateRecorded: DateWhereInput
  conversations_every: VideoConversationWhereInput
  conversations_some: VideoConversationWhereInput
  conversations_none: VideoConversationWhereInput
}

input VideoUploadMetadataWhereUniqueInput {
  id: ID
}

enum VideoUploadOrderByInput {
  id_ASC
  id_DESC
  createdAt_ASC
  createdAt_DESC
  updatedAt_ASC
  updatedAt_DESC
  published_ASC
  published_DESC
  submitedUrl_ASC
  submitedUrl_DESC
}

type VideoUploadPreviousValues {
  id: ID!
  createdAt: DateTime!
  updatedAt: DateTime!
  published: Boolean!
  submitedUrl: String!
}

type VideoUploadStatusLogItem implements Node {
  id: ID!
  status: VideoUploadLogItemStatus!
  videoUpload(where: VideoUploadWhereInput): VideoUpload!
  event: VideoUploadLogItemEvent!
  createdAt: DateTime!
  timesoutAt: Int
  message: String
}

"""A connection to a list of items."""
type VideoUploadStatusLogItemConnection {
  """Information to aid in pagination."""
  pageInfo: PageInfo!

  """A list of edges."""
  edges: [VideoUploadStatusLogItemEdge]!
  aggregate: AggregateVideoUploadStatusLogItem!
}

input VideoUploadStatusLogItemCreateInput {
  status: VideoUploadLogItemStatus!
  event: VideoUploadLogItemEvent!
  timesoutAt: Int
  message: String
  videoUpload: VideoUploadCreateOneWithoutStatusLogInput!
}

input VideoUploadStatusLogItemCreateManyWithoutVideoUploadInput {
  create: [VideoUploadStatusLogItemCreateWithoutVideoUploadInput!]
  connect: [VideoUploadStatusLogItemWhereUniqueInput!]
}

input VideoUploadStatusLogItemCreateWithoutVideoUploadInput {
  status: VideoUploadLogItemStatus!
  event: VideoUploadLogItemEvent!
  timesoutAt: Int
  message: String
}

"""An edge in a connection."""
type VideoUploadStatusLogItemEdge {
  """The item at the end of the edge."""
  node: VideoUploadStatusLogItem!

  """A cursor for use in pagination."""
  cursor: String!
}

enum VideoUploadStatusLogItemOrderByInput {
  id_ASC
  id_DESC
  status_ASC
  status_DESC
  event_ASC
  event_DESC
  createdAt_ASC
  createdAt_DESC
  timesoutAt_ASC
  timesoutAt_DESC
  message_ASC
  message_DESC
  updatedAt_ASC
  updatedAt_DESC
}

type VideoUploadStatusLogItemPreviousValues {
  id: ID!
  status: VideoUploadLogItemStatus!
  event: VideoUploadLogItemEvent!
  createdAt: DateTime!
  timesoutAt: Int
  message: String
}

type VideoUploadStatusLogItemSubscriptionPayload {
  mutation: MutationType!
  node: VideoUploadStatusLogItem
  updatedFields: [String!]
  previousValues: VideoUploadStatusLogItemPreviousValues
}

input VideoUploadStatusLogItemSubscriptionWhereInput {
  """Logical AND on all given filters."""
  AND: [VideoUploadStatusLogItemSubscriptionWhereInput!]

  """Logical OR on all given filters."""
  OR: [VideoUploadStatusLogItemSubscriptionWhereInput!]

  """Logical NOT on all given filters combined by AND."""
  NOT: [VideoUploadStatusLogItemSubscriptionWhereInput!]

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
  node: VideoUploadStatusLogItemWhereInput
}

input VideoUploadStatusLogItemUpdateInput {
  status: VideoUploadLogItemStatus
  event: VideoUploadLogItemEvent
  timesoutAt: Int
  message: String
  videoUpload: VideoUploadUpdateOneWithoutStatusLogInput
}

input VideoUploadStatusLogItemUpdateManyWithoutVideoUploadInput {
  create: [VideoUploadStatusLogItemCreateWithoutVideoUploadInput!]
  connect: [VideoUploadStatusLogItemWhereUniqueInput!]
  disconnect: [VideoUploadStatusLogItemWhereUniqueInput!]
  delete: [VideoUploadStatusLogItemWhereUniqueInput!]
  update: [VideoUploadStatusLogItemUpdateWithWhereUniqueWithoutVideoUploadInput!]
  upsert: [VideoUploadStatusLogItemUpsertWithWhereUniqueWithoutVideoUploadInput!]
}

input VideoUploadStatusLogItemUpdateWithoutVideoUploadDataInput {
  status: VideoUploadLogItemStatus
  event: VideoUploadLogItemEvent
  timesoutAt: Int
  message: String
}

input VideoUploadStatusLogItemUpdateWithWhereUniqueWithoutVideoUploadInput {
  where: VideoUploadStatusLogItemWhereUniqueInput!
  data: VideoUploadStatusLogItemUpdateWithoutVideoUploadDataInput!
}

input VideoUploadStatusLogItemUpsertWithWhereUniqueWithoutVideoUploadInput {
  where: VideoUploadStatusLogItemWhereUniqueInput!
  update: VideoUploadStatusLogItemUpdateWithoutVideoUploadDataInput!
  create: VideoUploadStatusLogItemCreateWithoutVideoUploadInput!
}

input VideoUploadStatusLogItemWhereInput {
  """Logical AND on all given filters."""
  AND: [VideoUploadStatusLogItemWhereInput!]

  """Logical OR on all given filters."""
  OR: [VideoUploadStatusLogItemWhereInput!]

  """Logical NOT on all given filters combined by AND."""
  NOT: [VideoUploadStatusLogItemWhereInput!]
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
  status: VideoUploadLogItemStatus

  """All values that are not equal to given value."""
  status_not: VideoUploadLogItemStatus

  """All values that are contained in given list."""
  status_in: [VideoUploadLogItemStatus!]

  """All values that are not contained in given list."""
  status_not_in: [VideoUploadLogItemStatus!]
  event: VideoUploadLogItemEvent

  """All values that are not equal to given value."""
  event_not: VideoUploadLogItemEvent

  """All values that are contained in given list."""
  event_in: [VideoUploadLogItemEvent!]

  """All values that are not contained in given list."""
  event_not_in: [VideoUploadLogItemEvent!]
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
  timesoutAt: Int

  """All values that are not equal to given value."""
  timesoutAt_not: Int

  """All values that are contained in given list."""
  timesoutAt_in: [Int!]

  """All values that are not contained in given list."""
  timesoutAt_not_in: [Int!]

  """All values less than the given value."""
  timesoutAt_lt: Int

  """All values less than or equal the given value."""
  timesoutAt_lte: Int

  """All values greater than the given value."""
  timesoutAt_gt: Int

  """All values greater than or equal the given value."""
  timesoutAt_gte: Int
  message: String

  """All values that are not equal to given value."""
  message_not: String

  """All values that are contained in given list."""
  message_in: [String!]

  """All values that are not contained in given list."""
  message_not_in: [String!]

  """All values less than the given value."""
  message_lt: String

  """All values less than or equal the given value."""
  message_lte: String

  """All values greater than the given value."""
  message_gt: String

  """All values greater than or equal the given value."""
  message_gte: String

  """All values containing the given string."""
  message_contains: String

  """All values not containing the given string."""
  message_not_contains: String

  """All values starting with the given string."""
  message_starts_with: String

  """All values not starting with the given string."""
  message_not_starts_with: String

  """All values ending with the given string."""
  message_ends_with: String

  """All values not ending with the given string."""
  message_not_ends_with: String
  videoUpload: VideoUploadWhereInput
}

input VideoUploadStatusLogItemWhereUniqueInput {
  id: ID
}

type VideoUploadStorageLink implements Node {
  id: ID!
  videoUpload(where: VideoUploadWhereInput): VideoUpload!
  path: String!
  bucket: String!
  version: VideoUploadFileLinkVersion!
  fileType: VideoUploadFileLinkType!
}

"""A connection to a list of items."""
type VideoUploadStorageLinkConnection {
  """Information to aid in pagination."""
  pageInfo: PageInfo!

  """A list of edges."""
  edges: [VideoUploadStorageLinkEdge]!
  aggregate: AggregateVideoUploadStorageLink!
}

input VideoUploadStorageLinkCreateInput {
  path: String!
  bucket: String!
  version: VideoUploadFileLinkVersion!
  fileType: VideoUploadFileLinkType!
  videoUpload: VideoUploadCreateOneWithoutStorageLinksInput!
}

input VideoUploadStorageLinkCreateManyWithoutVideoUploadInput {
  create: [VideoUploadStorageLinkCreateWithoutVideoUploadInput!]
  connect: [VideoUploadStorageLinkWhereUniqueInput!]
}

input VideoUploadStorageLinkCreateWithoutVideoUploadInput {
  path: String!
  bucket: String!
  version: VideoUploadFileLinkVersion!
  fileType: VideoUploadFileLinkType!
}

"""An edge in a connection."""
type VideoUploadStorageLinkEdge {
  """The item at the end of the edge."""
  node: VideoUploadStorageLink!

  """A cursor for use in pagination."""
  cursor: String!
}

enum VideoUploadStorageLinkOrderByInput {
  id_ASC
  id_DESC
  path_ASC
  path_DESC
  bucket_ASC
  bucket_DESC
  version_ASC
  version_DESC
  fileType_ASC
  fileType_DESC
  updatedAt_ASC
  updatedAt_DESC
  createdAt_ASC
  createdAt_DESC
}

type VideoUploadStorageLinkPreviousValues {
  id: ID!
  path: String!
  bucket: String!
  version: VideoUploadFileLinkVersion!
  fileType: VideoUploadFileLinkType!
}

type VideoUploadStorageLinkSubscriptionPayload {
  mutation: MutationType!
  node: VideoUploadStorageLink
  updatedFields: [String!]
  previousValues: VideoUploadStorageLinkPreviousValues
}

input VideoUploadStorageLinkSubscriptionWhereInput {
  """Logical AND on all given filters."""
  AND: [VideoUploadStorageLinkSubscriptionWhereInput!]

  """Logical OR on all given filters."""
  OR: [VideoUploadStorageLinkSubscriptionWhereInput!]

  """Logical NOT on all given filters combined by AND."""
  NOT: [VideoUploadStorageLinkSubscriptionWhereInput!]

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
  node: VideoUploadStorageLinkWhereInput
}

input VideoUploadStorageLinkUpdateInput {
  path: String
  bucket: String
  version: VideoUploadFileLinkVersion
  fileType: VideoUploadFileLinkType
  videoUpload: VideoUploadUpdateOneWithoutStorageLinksInput
}

input VideoUploadStorageLinkUpdateManyWithoutVideoUploadInput {
  create: [VideoUploadStorageLinkCreateWithoutVideoUploadInput!]
  connect: [VideoUploadStorageLinkWhereUniqueInput!]
  disconnect: [VideoUploadStorageLinkWhereUniqueInput!]
  delete: [VideoUploadStorageLinkWhereUniqueInput!]
  update: [VideoUploadStorageLinkUpdateWithWhereUniqueWithoutVideoUploadInput!]
  upsert: [VideoUploadStorageLinkUpsertWithWhereUniqueWithoutVideoUploadInput!]
}

input VideoUploadStorageLinkUpdateWithoutVideoUploadDataInput {
  path: String
  bucket: String
  version: VideoUploadFileLinkVersion
  fileType: VideoUploadFileLinkType
}

input VideoUploadStorageLinkUpdateWithWhereUniqueWithoutVideoUploadInput {
  where: VideoUploadStorageLinkWhereUniqueInput!
  data: VideoUploadStorageLinkUpdateWithoutVideoUploadDataInput!
}

input VideoUploadStorageLinkUpsertWithWhereUniqueWithoutVideoUploadInput {
  where: VideoUploadStorageLinkWhereUniqueInput!
  update: VideoUploadStorageLinkUpdateWithoutVideoUploadDataInput!
  create: VideoUploadStorageLinkCreateWithoutVideoUploadInput!
}

input VideoUploadStorageLinkWhereInput {
  """Logical AND on all given filters."""
  AND: [VideoUploadStorageLinkWhereInput!]

  """Logical OR on all given filters."""
  OR: [VideoUploadStorageLinkWhereInput!]

  """Logical NOT on all given filters combined by AND."""
  NOT: [VideoUploadStorageLinkWhereInput!]
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
  version: VideoUploadFileLinkVersion

  """All values that are not equal to given value."""
  version_not: VideoUploadFileLinkVersion

  """All values that are contained in given list."""
  version_in: [VideoUploadFileLinkVersion!]

  """All values that are not contained in given list."""
  version_not_in: [VideoUploadFileLinkVersion!]
  fileType: VideoUploadFileLinkType

  """All values that are not equal to given value."""
  fileType_not: VideoUploadFileLinkType

  """All values that are contained in given list."""
  fileType_in: [VideoUploadFileLinkType!]

  """All values that are not contained in given list."""
  fileType_not_in: [VideoUploadFileLinkType!]
  videoUpload: VideoUploadWhereInput
}

input VideoUploadStorageLinkWhereUniqueInput {
  id: ID
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

input VideoUploadUpdateInput {
  published: Boolean
  submitedUrl: String
  adminMetadata: VideoUploadAdminMetadataUpdateOneWithoutVideoUploadInput
  metadata: VideoUploadMetadataUpdateOneWithoutVideoUploadInput
  publishedBy: UserUpdateOneInput
  statusLog: VideoUploadStatusLogItemUpdateManyWithoutVideoUploadInput
  storageLinks: VideoUploadStorageLinkUpdateManyWithoutVideoUploadInput
  submitedBy: UserUpdateOneInput
}

input VideoUploadUpdateOneWithoutAdminMetadataInput {
  create: VideoUploadCreateWithoutAdminMetadataInput
  connect: VideoUploadWhereUniqueInput
  delete: Boolean
  update: VideoUploadUpdateWithoutAdminMetadataDataInput
  upsert: VideoUploadUpsertWithoutAdminMetadataInput
}

input VideoUploadUpdateOneWithoutMetadataInput {
  create: VideoUploadCreateWithoutMetadataInput
  connect: VideoUploadWhereUniqueInput
  delete: Boolean
  update: VideoUploadUpdateWithoutMetadataDataInput
  upsert: VideoUploadUpsertWithoutMetadataInput
}

input VideoUploadUpdateOneWithoutStatusLogInput {
  create: VideoUploadCreateWithoutStatusLogInput
  connect: VideoUploadWhereUniqueInput
  delete: Boolean
  update: VideoUploadUpdateWithoutStatusLogDataInput
  upsert: VideoUploadUpsertWithoutStatusLogInput
}

input VideoUploadUpdateOneWithoutStorageLinksInput {
  create: VideoUploadCreateWithoutStorageLinksInput
  connect: VideoUploadWhereUniqueInput
  delete: Boolean
  update: VideoUploadUpdateWithoutStorageLinksDataInput
  upsert: VideoUploadUpsertWithoutStorageLinksInput
}

input VideoUploadUpdateWithoutAdminMetadataDataInput {
  published: Boolean
  submitedUrl: String
  metadata: VideoUploadMetadataUpdateOneWithoutVideoUploadInput
  publishedBy: UserUpdateOneInput
  statusLog: VideoUploadStatusLogItemUpdateManyWithoutVideoUploadInput
  storageLinks: VideoUploadStorageLinkUpdateManyWithoutVideoUploadInput
  submitedBy: UserUpdateOneInput
}

input VideoUploadUpdateWithoutMetadataDataInput {
  published: Boolean
  submitedUrl: String
  adminMetadata: VideoUploadAdminMetadataUpdateOneWithoutVideoUploadInput
  publishedBy: UserUpdateOneInput
  statusLog: VideoUploadStatusLogItemUpdateManyWithoutVideoUploadInput
  storageLinks: VideoUploadStorageLinkUpdateManyWithoutVideoUploadInput
  submitedBy: UserUpdateOneInput
}

input VideoUploadUpdateWithoutStatusLogDataInput {
  published: Boolean
  submitedUrl: String
  adminMetadata: VideoUploadAdminMetadataUpdateOneWithoutVideoUploadInput
  metadata: VideoUploadMetadataUpdateOneWithoutVideoUploadInput
  publishedBy: UserUpdateOneInput
  storageLinks: VideoUploadStorageLinkUpdateManyWithoutVideoUploadInput
  submitedBy: UserUpdateOneInput
}

input VideoUploadUpdateWithoutStorageLinksDataInput {
  published: Boolean
  submitedUrl: String
  adminMetadata: VideoUploadAdminMetadataUpdateOneWithoutVideoUploadInput
  metadata: VideoUploadMetadataUpdateOneWithoutVideoUploadInput
  publishedBy: UserUpdateOneInput
  statusLog: VideoUploadStatusLogItemUpdateManyWithoutVideoUploadInput
  submitedBy: UserUpdateOneInput
}

input VideoUploadUpsertWithoutAdminMetadataInput {
  update: VideoUploadUpdateWithoutAdminMetadataDataInput!
  create: VideoUploadCreateWithoutAdminMetadataInput!
}

input VideoUploadUpsertWithoutMetadataInput {
  update: VideoUploadUpdateWithoutMetadataDataInput!
  create: VideoUploadCreateWithoutMetadataInput!
}

input VideoUploadUpsertWithoutStatusLogInput {
  update: VideoUploadUpdateWithoutStatusLogDataInput!
  create: VideoUploadCreateWithoutStatusLogInput!
}

input VideoUploadUpsertWithoutStorageLinksInput {
  update: VideoUploadUpdateWithoutStorageLinksDataInput!
  create: VideoUploadCreateWithoutStorageLinksInput!
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
  published: Boolean

  """All values that are not equal to given value."""
  published_not: Boolean
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
  adminMetadata: VideoUploadAdminMetadataWhereInput
  metadata: VideoUploadMetadataWhereInput
  publishedBy: UserWhereInput
  statusLog_every: VideoUploadStatusLogItemWhereInput
  statusLog_some: VideoUploadStatusLogItemWhereInput
  statusLog_none: VideoUploadStatusLogItemWhereInput
  storageLinks_every: VideoUploadStorageLinkWhereInput
  storageLinks_some: VideoUploadStorageLinkWhereInput
  storageLinks_none: VideoUploadStorageLinkWhereInput
  submitedBy: UserWhereInput
}

input VideoUploadWhereUniqueInput {
  id: ID
  submitedUrl: String
}
`

export const Prisma = makePrismaBindingClass<BindingConstructor<Prisma>>({typeDefs})

/**
 * Types
*/

export type ConversationBlockOrderByInput =   'start_ASC' |
  'start_DESC' |
  'end_ASC' |
  'end_DESC' |
  'content_ASC' |
  'content_DESC' |
  'id_ASC' |
  'id_DESC' |
  'updatedAt_ASC' |
  'updatedAt_DESC' |
  'createdAt_ASC' |
  'createdAt_DESC'

export type VideoUploadFileLinkVersion =   'WEB' |
  'MASTER'

export type AdminRole =   'CREATE_UPLOAD' |
  'LIST_UPLOADS' |
  'LIST_ALL_UPLOADS' |
  'ADVANCE_UPLOADS' |
  'PUBLISH_UPLOAD' |
  'DELETE_UPLOADS'

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

export type Role =   'USER' |
  'ADMIN'

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

export type VideoConversationOrderByInput =   'id_ASC' |
  'id_DESC' |
  'createdAt_ASC' |
  'createdAt_DESC' |
  'draft_ASC' |
  'draft_DESC' |
  'updatedAt_ASC' |
  'updatedAt_DESC'

export type VideoUploadMetadataOrderByInput =   'id_ASC' |
  'id_DESC' |
  'title_ASC' |
  'title_DESC' |
  'subtitle_ASC' |
  'subtitle_DESC' |
  'speakers_ASC' |
  'speakers_DESC' |
  'renderStart_ASC' |
  'renderStart_DESC' |
  'renderEnd_ASC' |
  'renderEnd_DESC' |
  'updatedAt_ASC' |
  'updatedAt_DESC' |
  'createdAt_ASC' |
  'createdAt_DESC'

export type VideoUploadLogItemEvent =   'DOWNLOAD' |
  'ENCODE' |
  'TRANSCRIPTION' |
  'USER_INPUT' |
  'NLP' |
  'SOCIAL' |
  'THUMBNAIL'

export type VideoUploadLogItemStatus =   'DISPATCHED' |
  'UPDATE' |
  'STARTED' |
  'FINISHED' |
  'FAILED' |
  'TIMED_OUT'

export type VideoUploadFileLinkType =   'WEBM' |
  'MP4' |
  'MP4_DASH' |
  'MP4_DASH_MANIFEST' |
  'AUDIO' |
  'THUMBNAIL'

export type VideoUploadOrderByInput =   'id_ASC' |
  'id_DESC' |
  'createdAt_ASC' |
  'createdAt_DESC' |
  'updatedAt_ASC' |
  'updatedAt_DESC' |
  'published_ASC' |
  'published_DESC' |
  'submitedUrl_ASC' |
  'submitedUrl_DESC'

export type VideoUploadStorageLinkOrderByInput =   'id_ASC' |
  'id_DESC' |
  'path_ASC' |
  'path_DESC' |
  'bucket_ASC' |
  'bucket_DESC' |
  'version_ASC' |
  'version_DESC' |
  'fileType_ASC' |
  'fileType_DESC' |
  'updatedAt_ASC' |
  'updatedAt_DESC' |
  'createdAt_ASC' |
  'createdAt_DESC'

export type VideoUploadAdminMetadataOrderByInput =   'id_ASC' |
  'id_DESC' |
  'advertisingEnabled_ASC' |
  'advertisingEnabled_DESC' |
  'updatedAt_ASC' |
  'updatedAt_DESC' |
  'createdAt_ASC' |
  'createdAt_DESC'

export type SpeakerOrderByInput =   'id_ASC' |
  'id_DESC' |
  'name_ASC' |
  'name_DESC' |
  'avatarPath_ASC' |
  'avatarPath_DESC' |
  'title_ASC' |
  'title_DESC' |
  'updatedAt_ASC' |
  'updatedAt_DESC' |
  'createdAt_ASC' |
  'createdAt_DESC'

export type MutationType =   'CREATED' |
  'UPDATED' |
  'DELETED'

export type VideoUploadStatusLogItemOrderByInput =   'id_ASC' |
  'id_DESC' |
  'status_ASC' |
  'status_DESC' |
  'event_ASC' |
  'event_DESC' |
  'createdAt_ASC' |
  'createdAt_DESC' |
  'timesoutAt_ASC' |
  'timesoutAt_DESC' |
  'message_ASC' |
  'message_DESC' |
  'updatedAt_ASC' |
  'updatedAt_DESC'

export interface VideoUploadStatusLogItemCreateWithoutVideoUploadInput {
  status: VideoUploadLogItemStatus
  event: VideoUploadLogItemEvent
  timesoutAt?: Int
  message?: String
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
  published?: Boolean
  published_not?: Boolean
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
  adminMetadata?: VideoUploadAdminMetadataWhereInput
  metadata?: VideoUploadMetadataWhereInput
  publishedBy?: UserWhereInput
  statusLog_every?: VideoUploadStatusLogItemWhereInput
  statusLog_some?: VideoUploadStatusLogItemWhereInput
  statusLog_none?: VideoUploadStatusLogItemWhereInput
  storageLinks_every?: VideoUploadStorageLinkWhereInput
  storageLinks_some?: VideoUploadStorageLinkWhereInput
  storageLinks_none?: VideoUploadStorageLinkWhereInput
  submitedBy?: UserWhereInput
}

export interface VideoUploadAdminMetadataCreateInput {
  advertisingEnabled?: Boolean
  videoUpload: VideoUploadCreateOneWithoutAdminMetadataInput
}

export interface VideoUploadStorageLinkWhereInput {
  AND?: VideoUploadStorageLinkWhereInput[] | VideoUploadStorageLinkWhereInput
  OR?: VideoUploadStorageLinkWhereInput[] | VideoUploadStorageLinkWhereInput
  NOT?: VideoUploadStorageLinkWhereInput[] | VideoUploadStorageLinkWhereInput
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
  version?: VideoUploadFileLinkVersion
  version_not?: VideoUploadFileLinkVersion
  version_in?: VideoUploadFileLinkVersion[] | VideoUploadFileLinkVersion
  version_not_in?: VideoUploadFileLinkVersion[] | VideoUploadFileLinkVersion
  fileType?: VideoUploadFileLinkType
  fileType_not?: VideoUploadFileLinkType
  fileType_in?: VideoUploadFileLinkType[] | VideoUploadFileLinkType
  fileType_not_in?: VideoUploadFileLinkType[] | VideoUploadFileLinkType
  videoUpload?: VideoUploadWhereInput
}

export interface VideoUploadCreateOneWithoutAdminMetadataInput {
  create?: VideoUploadCreateWithoutAdminMetadataInput
  connect?: VideoUploadWhereUniqueInput
}

export interface SpeakerWhereInput {
  AND?: SpeakerWhereInput[] | SpeakerWhereInput
  OR?: SpeakerWhereInput[] | SpeakerWhereInput
  NOT?: SpeakerWhereInput[] | SpeakerWhereInput
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

export interface VideoUploadStorageLinkUpdateManyWithoutVideoUploadInput {
  create?: VideoUploadStorageLinkCreateWithoutVideoUploadInput[] | VideoUploadStorageLinkCreateWithoutVideoUploadInput
  connect?: VideoUploadStorageLinkWhereUniqueInput[] | VideoUploadStorageLinkWhereUniqueInput
  disconnect?: VideoUploadStorageLinkWhereUniqueInput[] | VideoUploadStorageLinkWhereUniqueInput
  delete?: VideoUploadStorageLinkWhereUniqueInput[] | VideoUploadStorageLinkWhereUniqueInput
  update?: VideoUploadStorageLinkUpdateWithWhereUniqueWithoutVideoUploadInput[] | VideoUploadStorageLinkUpdateWithWhereUniqueWithoutVideoUploadInput
  upsert?: VideoUploadStorageLinkUpsertWithWhereUniqueWithoutVideoUploadInput[] | VideoUploadStorageLinkUpsertWithWhereUniqueWithoutVideoUploadInput
}

export interface UserUpdateadminRolesInput {
  set?: AdminRole[] | AdminRole
}

export interface VideoUploadStatusLogItemUpsertWithWhereUniqueWithoutVideoUploadInput {
  where: VideoUploadStatusLogItemWhereUniqueInput
  update: VideoUploadStatusLogItemUpdateWithoutVideoUploadDataInput
  create: VideoUploadStatusLogItemCreateWithoutVideoUploadInput
}

export interface VideoUploadCreateWithoutAdminMetadataInput {
  published?: Boolean
  submitedUrl: String
  metadata: VideoUploadMetadataCreateOneWithoutVideoUploadInput
  publishedBy?: UserCreateOneInput
  statusLog?: VideoUploadStatusLogItemCreateManyWithoutVideoUploadInput
  storageLinks?: VideoUploadStorageLinkCreateManyWithoutVideoUploadInput
  submitedBy: UserCreateOneInput
}

export interface VideoUploadStatusLogItemUpdateWithoutVideoUploadDataInput {
  status?: VideoUploadLogItemStatus
  event?: VideoUploadLogItemEvent
  timesoutAt?: Int
  message?: String
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

export interface VideoUploadStatusLogItemUpdateWithWhereUniqueWithoutVideoUploadInput {
  where: VideoUploadStatusLogItemWhereUniqueInput
  data: VideoUploadStatusLogItemUpdateWithoutVideoUploadDataInput
}

export interface VideoConversationSubscriptionWhereInput {
  AND?: VideoConversationSubscriptionWhereInput[] | VideoConversationSubscriptionWhereInput
  OR?: VideoConversationSubscriptionWhereInput[] | VideoConversationSubscriptionWhereInput
  NOT?: VideoConversationSubscriptionWhereInput[] | VideoConversationSubscriptionWhereInput
  mutation_in?: MutationType[] | MutationType
  updatedFields_contains?: String
  updatedFields_contains_every?: String[] | String
  updatedFields_contains_some?: String[] | String
  node?: VideoConversationWhereInput
}

export interface VideoUploadStatusLogItemUpdateManyWithoutVideoUploadInput {
  create?: VideoUploadStatusLogItemCreateWithoutVideoUploadInput[] | VideoUploadStatusLogItemCreateWithoutVideoUploadInput
  connect?: VideoUploadStatusLogItemWhereUniqueInput[] | VideoUploadStatusLogItemWhereUniqueInput
  disconnect?: VideoUploadStatusLogItemWhereUniqueInput[] | VideoUploadStatusLogItemWhereUniqueInput
  delete?: VideoUploadStatusLogItemWhereUniqueInput[] | VideoUploadStatusLogItemWhereUniqueInput
  update?: VideoUploadStatusLogItemUpdateWithWhereUniqueWithoutVideoUploadInput[] | VideoUploadStatusLogItemUpdateWithWhereUniqueWithoutVideoUploadInput
  upsert?: VideoUploadStatusLogItemUpsertWithWhereUniqueWithoutVideoUploadInput[] | VideoUploadStatusLogItemUpsertWithWhereUniqueWithoutVideoUploadInput
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
}

export interface VideoUploadMetadataUpsertWithoutVideoUploadInput {
  update: VideoUploadMetadataUpdateWithoutVideoUploadDataInput
  create: VideoUploadMetadataCreateWithoutVideoUploadInput
}

export interface ConversationBlockSubscriptionWhereInput {
  AND?: ConversationBlockSubscriptionWhereInput[] | ConversationBlockSubscriptionWhereInput
  OR?: ConversationBlockSubscriptionWhereInput[] | ConversationBlockSubscriptionWhereInput
  NOT?: ConversationBlockSubscriptionWhereInput[] | ConversationBlockSubscriptionWhereInput
  mutation_in?: MutationType[] | MutationType
  updatedFields_contains?: String
  updatedFields_contains_every?: String[] | String
  updatedFields_contains_some?: String[] | String
  node?: ConversationBlockWhereInput
}

export interface VideoUploadCreateInput {
  published?: Boolean
  submitedUrl: String
  adminMetadata?: VideoUploadAdminMetadataCreateOneWithoutVideoUploadInput
  metadata: VideoUploadMetadataCreateOneWithoutVideoUploadInput
  publishedBy?: UserCreateOneInput
  statusLog?: VideoUploadStatusLogItemCreateManyWithoutVideoUploadInput
  storageLinks?: VideoUploadStorageLinkCreateManyWithoutVideoUploadInput
  submitedBy: UserCreateOneInput
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
}

export interface VideoUploadAdminMetadataCreateOneWithoutVideoUploadInput {
  create?: VideoUploadAdminMetadataCreateWithoutVideoUploadInput
  connect?: VideoUploadAdminMetadataWhereUniqueInput
}

export interface VideoUploadMetadataSubscriptionWhereInput {
  AND?: VideoUploadMetadataSubscriptionWhereInput[] | VideoUploadMetadataSubscriptionWhereInput
  OR?: VideoUploadMetadataSubscriptionWhereInput[] | VideoUploadMetadataSubscriptionWhereInput
  NOT?: VideoUploadMetadataSubscriptionWhereInput[] | VideoUploadMetadataSubscriptionWhereInput
  mutation_in?: MutationType[] | MutationType
  updatedFields_contains?: String
  updatedFields_contains_every?: String[] | String
  updatedFields_contains_some?: String[] | String
  node?: VideoUploadMetadataWhereInput
}

export interface VideoUploadAdminMetadataCreateWithoutVideoUploadInput {
  advertisingEnabled?: Boolean
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

export interface VideoUploadMetadataCreateOneWithoutVideoUploadInput {
  create?: VideoUploadMetadataCreateWithoutVideoUploadInput
  connect?: VideoUploadMetadataWhereUniqueInput
}

export interface VideoUploadAdminMetadataWhereInput {
  AND?: VideoUploadAdminMetadataWhereInput[] | VideoUploadAdminMetadataWhereInput
  OR?: VideoUploadAdminMetadataWhereInput[] | VideoUploadAdminMetadataWhereInput
  NOT?: VideoUploadAdminMetadataWhereInput[] | VideoUploadAdminMetadataWhereInput
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
  advertisingEnabled?: Boolean
  advertisingEnabled_not?: Boolean
  videoUpload?: VideoUploadWhereInput
}

export interface VideoUploadMetadataCreateWithoutVideoUploadInput {
  title?: String
  subtitle?: String
  speakers?: Int
  renderStart?: Float
  renderEnd?: Float
  dateRecorded?: DateCreateOneInput
  conversations?: VideoConversationCreateManyInput
}

export interface SpeakerUpsertNestedInput {
  update: SpeakerUpdateDataInput
  create: SpeakerCreateInput
}

export interface DateCreateOneInput {
  create?: DateCreateInput
}

export interface VideoUploadStorageLinkWhereUniqueInput {
  id?: ID_Input
}

export interface DateCreateInput {
  month: Int
  day: Int
  year: Int
}

export interface VideoUploadAdminMetadataWhereUniqueInput {
  id?: ID_Input
}

export interface VideoConversationCreateManyInput {
  create?: VideoConversationCreateInput[] | VideoConversationCreateInput
  connect?: VideoConversationWhereUniqueInput[] | VideoConversationWhereUniqueInput
}

export interface VideoConversationWhereUniqueInput {
  id?: ID_Input
}

export interface VideoConversationCreateInput {
  draft?: Boolean
  createdBy?: UserCreateOneInput
  blocks?: ConversationBlockCreateManyInput
}

export interface UserWhereUniqueInput {
  id?: ID_Input
  auth0Id?: String
}

export interface UserCreateOneInput {
  create?: UserCreateInput
  connect?: UserWhereUniqueInput
}

export interface SpeakerUpdateOneInput {
  create?: SpeakerCreateInput
  connect?: SpeakerWhereUniqueInput
  disconnect?: Boolean
  delete?: Boolean
  update?: SpeakerUpdateDataInput
  upsert?: SpeakerUpsertNestedInput
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

export interface UserCreateadminRolesInput {
  set?: AdminRole[] | AdminRole
}

export interface VideoConversationUpdateInput {
  draft?: Boolean
  createdBy?: UserUpdateOneInput
  blocks?: ConversationBlockUpdateManyInput
}

export interface ConversationBlockCreateManyInput {
  create?: ConversationBlockCreateInput[] | ConversationBlockCreateInput
}

export interface VideoUploadUpdateWithoutStatusLogDataInput {
  published?: Boolean
  submitedUrl?: String
  adminMetadata?: VideoUploadAdminMetadataUpdateOneWithoutVideoUploadInput
  metadata?: VideoUploadMetadataUpdateOneWithoutVideoUploadInput
  publishedBy?: UserUpdateOneInput
  storageLinks?: VideoUploadStorageLinkUpdateManyWithoutVideoUploadInput
  submitedBy?: UserUpdateOneInput
}

export interface ConversationBlockCreateInput {
  start: Float
  end: Float
  content: String
  speaker?: SpeakerCreateOneInput
}

export interface VideoUploadStatusLogItemUpdateInput {
  status?: VideoUploadLogItemStatus
  event?: VideoUploadLogItemEvent
  timesoutAt?: Int
  message?: String
  videoUpload?: VideoUploadUpdateOneWithoutStatusLogInput
}

export interface SpeakerCreateOneInput {
  create?: SpeakerCreateInput
  connect?: SpeakerWhereUniqueInput
}

export interface VideoUploadUpdateWithoutAdminMetadataDataInput {
  published?: Boolean
  submitedUrl?: String
  metadata?: VideoUploadMetadataUpdateOneWithoutVideoUploadInput
  publishedBy?: UserUpdateOneInput
  statusLog?: VideoUploadStatusLogItemUpdateManyWithoutVideoUploadInput
  storageLinks?: VideoUploadStorageLinkUpdateManyWithoutVideoUploadInput
  submitedBy?: UserUpdateOneInput
}

export interface SpeakerCreateInput {
  name: String
  avatarPath?: String
  title?: String
}

export interface VideoUploadAdminMetadataUpdateInput {
  advertisingEnabled?: Boolean
  videoUpload?: VideoUploadUpdateOneWithoutAdminMetadataInput
}

export interface VideoUploadStatusLogItemCreateManyWithoutVideoUploadInput {
  create?: VideoUploadStatusLogItemCreateWithoutVideoUploadInput[] | VideoUploadStatusLogItemCreateWithoutVideoUploadInput
  connect?: VideoUploadStatusLogItemWhereUniqueInput[] | VideoUploadStatusLogItemWhereUniqueInput
}

export interface VideoUploadUpdateWithoutMetadataDataInput {
  published?: Boolean
  submitedUrl?: String
  adminMetadata?: VideoUploadAdminMetadataUpdateOneWithoutVideoUploadInput
  publishedBy?: UserUpdateOneInput
  statusLog?: VideoUploadStatusLogItemUpdateManyWithoutVideoUploadInput
  storageLinks?: VideoUploadStorageLinkUpdateManyWithoutVideoUploadInput
  submitedBy?: UserUpdateOneInput
}

export interface VideoConversationUpsertWithWhereUniqueNestedInput {
  where: VideoConversationWhereUniqueInput
  update: VideoConversationUpdateDataInput
  create: VideoConversationCreateInput
}

export interface VideoUploadMetadataUpdateInput {
  title?: String
  subtitle?: String
  speakers?: Int
  renderStart?: Float
  renderEnd?: Float
  videoUpload?: VideoUploadUpdateOneWithoutMetadataInput
  dateRecorded?: DateUpdateOneInput
  conversations?: VideoConversationUpdateManyInput
}

export interface VideoUploadStorageLinkCreateManyWithoutVideoUploadInput {
  create?: VideoUploadStorageLinkCreateWithoutVideoUploadInput[] | VideoUploadStorageLinkCreateWithoutVideoUploadInput
  connect?: VideoUploadStorageLinkWhereUniqueInput[] | VideoUploadStorageLinkWhereUniqueInput
}

export interface VideoUploadUpdateWithoutStorageLinksDataInput {
  published?: Boolean
  submitedUrl?: String
  adminMetadata?: VideoUploadAdminMetadataUpdateOneWithoutVideoUploadInput
  metadata?: VideoUploadMetadataUpdateOneWithoutVideoUploadInput
  publishedBy?: UserUpdateOneInput
  statusLog?: VideoUploadStatusLogItemUpdateManyWithoutVideoUploadInput
  submitedBy?: UserUpdateOneInput
}

export interface VideoUploadStorageLinkCreateWithoutVideoUploadInput {
  path: String
  bucket: String
  version: VideoUploadFileLinkVersion
  fileType: VideoUploadFileLinkType
}

export interface VideoUploadStorageLinkUpdateInput {
  path?: String
  bucket?: String
  version?: VideoUploadFileLinkVersion
  fileType?: VideoUploadFileLinkType
  videoUpload?: VideoUploadUpdateOneWithoutStorageLinksInput
}

export interface VideoUploadStorageLinkCreateInput {
  path: String
  bucket: String
  version: VideoUploadFileLinkVersion
  fileType: VideoUploadFileLinkType
  videoUpload: VideoUploadCreateOneWithoutStorageLinksInput
}

export interface VideoUploadStorageLinkUpdateWithoutVideoUploadDataInput {
  path?: String
  bucket?: String
  version?: VideoUploadFileLinkVersion
  fileType?: VideoUploadFileLinkType
}

export interface VideoUploadCreateOneWithoutStorageLinksInput {
  create?: VideoUploadCreateWithoutStorageLinksInput
  connect?: VideoUploadWhereUniqueInput
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

export interface VideoUploadCreateWithoutStorageLinksInput {
  published?: Boolean
  submitedUrl: String
  adminMetadata?: VideoUploadAdminMetadataCreateOneWithoutVideoUploadInput
  metadata: VideoUploadMetadataCreateOneWithoutVideoUploadInput
  publishedBy?: UserCreateOneInput
  statusLog?: VideoUploadStatusLogItemCreateManyWithoutVideoUploadInput
  submitedBy: UserCreateOneInput
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

export interface VideoUploadMetadataCreateInput {
  title?: String
  subtitle?: String
  speakers?: Int
  renderStart?: Float
  renderEnd?: Float
  videoUpload: VideoUploadCreateOneWithoutMetadataInput
  dateRecorded?: DateCreateOneInput
  conversations?: VideoConversationCreateManyInput
}

export interface VideoUploadStatusLogItemSubscriptionWhereInput {
  AND?: VideoUploadStatusLogItemSubscriptionWhereInput[] | VideoUploadStatusLogItemSubscriptionWhereInput
  OR?: VideoUploadStatusLogItemSubscriptionWhereInput[] | VideoUploadStatusLogItemSubscriptionWhereInput
  NOT?: VideoUploadStatusLogItemSubscriptionWhereInput[] | VideoUploadStatusLogItemSubscriptionWhereInput
  mutation_in?: MutationType[] | MutationType
  updatedFields_contains?: String
  updatedFields_contains_every?: String[] | String
  updatedFields_contains_some?: String[] | String
  node?: VideoUploadStatusLogItemWhereInput
}

export interface VideoUploadCreateOneWithoutMetadataInput {
  create?: VideoUploadCreateWithoutMetadataInput
  connect?: VideoUploadWhereUniqueInput
}

export interface VideoUploadStorageLinkSubscriptionWhereInput {
  AND?: VideoUploadStorageLinkSubscriptionWhereInput[] | VideoUploadStorageLinkSubscriptionWhereInput
  OR?: VideoUploadStorageLinkSubscriptionWhereInput[] | VideoUploadStorageLinkSubscriptionWhereInput
  NOT?: VideoUploadStorageLinkSubscriptionWhereInput[] | VideoUploadStorageLinkSubscriptionWhereInput
  mutation_in?: MutationType[] | MutationType
  updatedFields_contains?: String
  updatedFields_contains_every?: String[] | String
  updatedFields_contains_some?: String[] | String
  node?: VideoUploadStorageLinkWhereInput
}

export interface VideoUploadCreateWithoutMetadataInput {
  published?: Boolean
  submitedUrl: String
  adminMetadata?: VideoUploadAdminMetadataCreateOneWithoutVideoUploadInput
  publishedBy?: UserCreateOneInput
  statusLog?: VideoUploadStatusLogItemCreateManyWithoutVideoUploadInput
  storageLinks?: VideoUploadStorageLinkCreateManyWithoutVideoUploadInput
  submitedBy: UserCreateOneInput
}

export interface DateUpdateInput {
  month?: Int
  day?: Int
  year?: Int
}

export interface VideoUploadStatusLogItemWhereInput {
  AND?: VideoUploadStatusLogItemWhereInput[] | VideoUploadStatusLogItemWhereInput
  OR?: VideoUploadStatusLogItemWhereInput[] | VideoUploadStatusLogItemWhereInput
  NOT?: VideoUploadStatusLogItemWhereInput[] | VideoUploadStatusLogItemWhereInput
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
  status?: VideoUploadLogItemStatus
  status_not?: VideoUploadLogItemStatus
  status_in?: VideoUploadLogItemStatus[] | VideoUploadLogItemStatus
  status_not_in?: VideoUploadLogItemStatus[] | VideoUploadLogItemStatus
  event?: VideoUploadLogItemEvent
  event_not?: VideoUploadLogItemEvent
  event_in?: VideoUploadLogItemEvent[] | VideoUploadLogItemEvent
  event_not_in?: VideoUploadLogItemEvent[] | VideoUploadLogItemEvent
  createdAt?: DateTime
  createdAt_not?: DateTime
  createdAt_in?: DateTime[] | DateTime
  createdAt_not_in?: DateTime[] | DateTime
  createdAt_lt?: DateTime
  createdAt_lte?: DateTime
  createdAt_gt?: DateTime
  createdAt_gte?: DateTime
  timesoutAt?: Int
  timesoutAt_not?: Int
  timesoutAt_in?: Int[] | Int
  timesoutAt_not_in?: Int[] | Int
  timesoutAt_lt?: Int
  timesoutAt_lte?: Int
  timesoutAt_gt?: Int
  timesoutAt_gte?: Int
  message?: String
  message_not?: String
  message_in?: String[] | String
  message_not_in?: String[] | String
  message_lt?: String
  message_lte?: String
  message_gt?: String
  message_gte?: String
  message_contains?: String
  message_not_contains?: String
  message_starts_with?: String
  message_not_starts_with?: String
  message_ends_with?: String
  message_not_ends_with?: String
  videoUpload?: VideoUploadWhereInput
}

export interface VideoUploadMetadataWhereUniqueInput {
  id?: ID_Input
}

export interface ConversationBlockUpdateManyInput {
  create?: ConversationBlockCreateInput[] | ConversationBlockCreateInput
}

export interface SpeakerWhereUniqueInput {
  id?: ID_Input
  name?: String
}

export interface UserUpsertNestedInput {
  update: UserUpdateDataInput
  create: UserCreateInput
}

export interface ConversationBlockUpdateInput {
  start?: Float
  end?: Float
  content?: String
  speaker?: SpeakerUpdateOneInput
}

export interface VideoUploadStatusLogItemCreateInput {
  status: VideoUploadLogItemStatus
  event: VideoUploadLogItemEvent
  timesoutAt?: Int
  message?: String
  videoUpload: VideoUploadCreateOneWithoutStatusLogInput
}

export interface VideoUploadUpsertWithoutStatusLogInput {
  update: VideoUploadUpdateWithoutStatusLogDataInput
  create: VideoUploadCreateWithoutStatusLogInput
}

export interface VideoUploadCreateOneWithoutStatusLogInput {
  create?: VideoUploadCreateWithoutStatusLogInput
  connect?: VideoUploadWhereUniqueInput
}

export interface VideoUploadUpsertWithoutAdminMetadataInput {
  update: VideoUploadUpdateWithoutAdminMetadataDataInput
  create: VideoUploadCreateWithoutAdminMetadataInput
}

export interface VideoUploadCreateWithoutStatusLogInput {
  published?: Boolean
  submitedUrl: String
  adminMetadata?: VideoUploadAdminMetadataCreateOneWithoutVideoUploadInput
  metadata: VideoUploadMetadataCreateOneWithoutVideoUploadInput
  publishedBy?: UserCreateOneInput
  storageLinks?: VideoUploadStorageLinkCreateManyWithoutVideoUploadInput
  submitedBy: UserCreateOneInput
}

export interface VideoUploadUpsertWithoutMetadataInput {
  update: VideoUploadUpdateWithoutMetadataDataInput
  create: VideoUploadCreateWithoutMetadataInput
}

export interface VideoUploadUpdateInput {
  published?: Boolean
  submitedUrl?: String
  adminMetadata?: VideoUploadAdminMetadataUpdateOneWithoutVideoUploadInput
  metadata?: VideoUploadMetadataUpdateOneWithoutVideoUploadInput
  publishedBy?: UserUpdateOneInput
  statusLog?: VideoUploadStatusLogItemUpdateManyWithoutVideoUploadInput
  storageLinks?: VideoUploadStorageLinkUpdateManyWithoutVideoUploadInput
  submitedBy?: UserUpdateOneInput
}

export interface VideoUploadUpsertWithoutStorageLinksInput {
  update: VideoUploadUpdateWithoutStorageLinksDataInput
  create: VideoUploadCreateWithoutStorageLinksInput
}

export interface VideoUploadAdminMetadataUpdateOneWithoutVideoUploadInput {
  create?: VideoUploadAdminMetadataCreateWithoutVideoUploadInput
  connect?: VideoUploadAdminMetadataWhereUniqueInput
  disconnect?: Boolean
  delete?: Boolean
  update?: VideoUploadAdminMetadataUpdateWithoutVideoUploadDataInput
  upsert?: VideoUploadAdminMetadataUpsertWithoutVideoUploadInput
}

export interface VideoUploadStorageLinkUpsertWithWhereUniqueWithoutVideoUploadInput {
  where: VideoUploadStorageLinkWhereUniqueInput
  update: VideoUploadStorageLinkUpdateWithoutVideoUploadDataInput
  create: VideoUploadStorageLinkCreateWithoutVideoUploadInput
}

export interface VideoUploadAdminMetadataUpdateWithoutVideoUploadDataInput {
  advertisingEnabled?: Boolean
}

export interface ConversationBlockWhereInput {
  AND?: ConversationBlockWhereInput[] | ConversationBlockWhereInput
  OR?: ConversationBlockWhereInput[] | ConversationBlockWhereInput
  NOT?: ConversationBlockWhereInput[] | ConversationBlockWhereInput
  start?: Float
  start_not?: Float
  start_in?: Float[] | Float
  start_not_in?: Float[] | Float
  start_lt?: Float
  start_lte?: Float
  start_gt?: Float
  start_gte?: Float
  end?: Float
  end_not?: Float
  end_in?: Float[] | Float
  end_not_in?: Float[] | Float
  end_lt?: Float
  end_lte?: Float
  end_gt?: Float
  end_gte?: Float
  content?: String
  content_not?: String
  content_in?: String[] | String
  content_not_in?: String[] | String
  content_lt?: String
  content_lte?: String
  content_gt?: String
  content_gte?: String
  content_contains?: String
  content_not_contains?: String
  content_starts_with?: String
  content_not_starts_with?: String
  content_ends_with?: String
  content_not_ends_with?: String
  speaker?: SpeakerWhereInput
}

export interface VideoUploadAdminMetadataUpsertWithoutVideoUploadInput {
  update: VideoUploadAdminMetadataUpdateWithoutVideoUploadDataInput
  create: VideoUploadAdminMetadataCreateWithoutVideoUploadInput
}

export interface VideoUploadAdminMetadataSubscriptionWhereInput {
  AND?: VideoUploadAdminMetadataSubscriptionWhereInput[] | VideoUploadAdminMetadataSubscriptionWhereInput
  OR?: VideoUploadAdminMetadataSubscriptionWhereInput[] | VideoUploadAdminMetadataSubscriptionWhereInput
  NOT?: VideoUploadAdminMetadataSubscriptionWhereInput[] | VideoUploadAdminMetadataSubscriptionWhereInput
  mutation_in?: MutationType[] | MutationType
  updatedFields_contains?: String
  updatedFields_contains_every?: String[] | String
  updatedFields_contains_some?: String[] | String
  node?: VideoUploadAdminMetadataWhereInput
}

export interface VideoUploadMetadataUpdateOneWithoutVideoUploadInput {
  create?: VideoUploadMetadataCreateWithoutVideoUploadInput
  connect?: VideoUploadMetadataWhereUniqueInput
  delete?: Boolean
  update?: VideoUploadMetadataUpdateWithoutVideoUploadDataInput
  upsert?: VideoUploadMetadataUpsertWithoutVideoUploadInput
}

export interface VideoUploadWhereUniqueInput {
  id?: ID_Input
  submitedUrl?: String
}

export interface VideoUploadMetadataUpdateWithoutVideoUploadDataInput {
  title?: String
  subtitle?: String
  speakers?: Int
  renderStart?: Float
  renderEnd?: Float
  dateRecorded?: DateUpdateOneInput
  conversations?: VideoConversationUpdateManyInput
}

export interface SpeakerUpdateDataInput {
  name?: String
  avatarPath?: String
  title?: String
}

export interface DateUpdateOneInput {
  create?: DateCreateInput
  disconnect?: Boolean
  delete?: Boolean
  update?: DateUpdateDataInput
  upsert?: DateUpsertNestedInput
}

export interface VideoUploadUpdateOneWithoutStatusLogInput {
  create?: VideoUploadCreateWithoutStatusLogInput
  connect?: VideoUploadWhereUniqueInput
  delete?: Boolean
  update?: VideoUploadUpdateWithoutStatusLogDataInput
  upsert?: VideoUploadUpsertWithoutStatusLogInput
}

export interface DateUpdateDataInput {
  month?: Int
  day?: Int
  year?: Int
}

export interface VideoUploadUpdateOneWithoutMetadataInput {
  create?: VideoUploadCreateWithoutMetadataInput
  connect?: VideoUploadWhereUniqueInput
  delete?: Boolean
  update?: VideoUploadUpdateWithoutMetadataDataInput
  upsert?: VideoUploadUpsertWithoutMetadataInput
}

export interface DateUpsertNestedInput {
  update: DateUpdateDataInput
  create: DateCreateInput
}

export interface VideoUploadStorageLinkUpdateWithWhereUniqueWithoutVideoUploadInput {
  where: VideoUploadStorageLinkWhereUniqueInput
  data: VideoUploadStorageLinkUpdateWithoutVideoUploadDataInput
}

export interface VideoConversationUpdateManyInput {
  create?: VideoConversationCreateInput[] | VideoConversationCreateInput
  connect?: VideoConversationWhereUniqueInput[] | VideoConversationWhereUniqueInput
  disconnect?: VideoConversationWhereUniqueInput[] | VideoConversationWhereUniqueInput
  delete?: VideoConversationWhereUniqueInput[] | VideoConversationWhereUniqueInput
  update?: VideoConversationUpdateWithWhereUniqueNestedInput[] | VideoConversationUpdateWithWhereUniqueNestedInput
  upsert?: VideoConversationUpsertWithWhereUniqueNestedInput[] | VideoConversationUpsertWithWhereUniqueNestedInput
}

export interface VideoUploadMetadataWhereInput {
  AND?: VideoUploadMetadataWhereInput[] | VideoUploadMetadataWhereInput
  OR?: VideoUploadMetadataWhereInput[] | VideoUploadMetadataWhereInput
  NOT?: VideoUploadMetadataWhereInput[] | VideoUploadMetadataWhereInput
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
  speakers?: Int
  speakers_not?: Int
  speakers_in?: Int[] | Int
  speakers_not_in?: Int[] | Int
  speakers_lt?: Int
  speakers_lte?: Int
  speakers_gt?: Int
  speakers_gte?: Int
  renderStart?: Float
  renderStart_not?: Float
  renderStart_in?: Float[] | Float
  renderStart_not_in?: Float[] | Float
  renderStart_lt?: Float
  renderStart_lte?: Float
  renderStart_gt?: Float
  renderStart_gte?: Float
  renderEnd?: Float
  renderEnd_not?: Float
  renderEnd_in?: Float[] | Float
  renderEnd_not_in?: Float[] | Float
  renderEnd_lt?: Float
  renderEnd_lte?: Float
  renderEnd_gt?: Float
  renderEnd_gte?: Float
  videoUpload?: VideoUploadWhereInput
  dateRecorded?: DateWhereInput
  conversations_every?: VideoConversationWhereInput
  conversations_some?: VideoConversationWhereInput
  conversations_none?: VideoConversationWhereInput
}

export interface SpeakerUpdateInput {
  name?: String
  avatarPath?: String
  title?: String
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

export interface UserUpdateOneInput {
  create?: UserCreateInput
  connect?: UserWhereUniqueInput
  disconnect?: Boolean
  delete?: Boolean
  update?: UserUpdateDataInput
  upsert?: UserUpsertNestedInput
}

export interface VideoConversationUpdateDataInput {
  draft?: Boolean
  createdBy?: UserUpdateOneInput
  blocks?: ConversationBlockUpdateManyInput
}

export interface VideoConversationUpdateWithWhereUniqueNestedInput {
  where: VideoConversationWhereUniqueInput
  data: VideoConversationUpdateDataInput
}

export interface VideoUploadUpdateOneWithoutAdminMetadataInput {
  create?: VideoUploadCreateWithoutAdminMetadataInput
  connect?: VideoUploadWhereUniqueInput
  delete?: Boolean
  update?: VideoUploadUpdateWithoutAdminMetadataDataInput
  upsert?: VideoUploadUpsertWithoutAdminMetadataInput
}

export interface VideoUploadStatusLogItemWhereUniqueInput {
  id?: ID_Input
}

export interface VideoConversationWhereInput {
  AND?: VideoConversationWhereInput[] | VideoConversationWhereInput
  OR?: VideoConversationWhereInput[] | VideoConversationWhereInput
  NOT?: VideoConversationWhereInput[] | VideoConversationWhereInput
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
  draft?: Boolean
  draft_not?: Boolean
  createdBy?: UserWhereInput
  blocks_every?: ConversationBlockWhereInput
  blocks_some?: ConversationBlockWhereInput
  blocks_none?: ConversationBlockWhereInput
}

export interface VideoUploadUpdateOneWithoutStorageLinksInput {
  create?: VideoUploadCreateWithoutStorageLinksInput
  connect?: VideoUploadWhereUniqueInput
  delete?: Boolean
  update?: VideoUploadUpdateWithoutStorageLinksDataInput
  upsert?: VideoUploadUpsertWithoutStorageLinksInput
}

/*
 * An object with an ID

 */
export interface Node {
  id: ID_Output
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
export interface VideoUploadConnection {
  pageInfo: PageInfo
  edges: VideoUploadEdge[]
  aggregate: AggregateVideoUpload
}

export interface VideoUploadAdminMetadata extends Node {
  id: ID_Output
  videoUpload: VideoUpload
  advertisingEnabled: Boolean
}

export interface VideoUpload extends Node {
  id: ID_Output
  adminMetadata?: VideoUploadAdminMetadata
  createdAt: DateTime
  updatedAt: DateTime
  metadata: VideoUploadMetadata
  publishedBy?: User
  published: Boolean
  statusLog?: VideoUploadStatusLogItem[]
  storageLinks?: VideoUploadStorageLink[]
  submitedBy: User
  submitedUrl: String
}

export interface VideoConversationPreviousValues {
  id: ID_Output
  createdAt: DateTime
  draft?: Boolean
}

export interface AggregateUser {
  count: Int
}

/*
 * An edge in a connection.

 */
export interface UserEdge {
  node: User
  cursor: String
}

/*
 * A connection to a list of items.

 */
export interface UserConnection {
  pageInfo: PageInfo
  edges: UserEdge[]
  aggregate: AggregateUser
}

/*
 * An edge in a connection.

 */
export interface SpeakerEdge {
  node: Speaker
  cursor: String
}

export interface VideoUploadMetadata extends Node {
  id: ID_Output
  videoUpload: VideoUpload
  title?: String
  subtitle?: String
  dateRecorded?: Date
  speakers: Int
  renderStart: Float
  renderEnd: Float
  conversations?: VideoConversation[]
}

export interface AggregateVideoConversation {
  count: Int
}

export interface SpeakerPreviousValues {
  id: ID_Output
  name: String
  avatarPath?: String
  title?: String
}

/*
 * A connection to a list of items.

 */
export interface VideoConversationConnection {
  pageInfo: PageInfo
  edges: VideoConversationEdge[]
  aggregate: AggregateVideoConversation
}

export interface SpeakerSubscriptionPayload {
  mutation: MutationType
  node?: Speaker
  updatedFields?: String[]
  previousValues?: SpeakerPreviousValues
}

/*
 * An edge in a connection.

 */
export interface DateEdge {
  node: Date
  cursor: String
}

export interface VideoUploadSubscriptionPayload {
  mutation: MutationType
  node?: VideoUpload
  updatedFields?: String[]
  previousValues?: VideoUploadPreviousValues
}

export interface AggregateConversationBlock {
  count: Int
}

export interface VideoUploadPreviousValues {
  id: ID_Output
  createdAt: DateTime
  updatedAt: DateTime
  published: Boolean
  submitedUrl: String
}

/*
 * A connection to a list of items.

 */
export interface ConversationBlockConnection {
  pageInfo: PageInfo
  edges: ConversationBlockEdge[]
  aggregate: AggregateConversationBlock
}

export interface VideoUploadStorageLink extends Node {
  id: ID_Output
  videoUpload: VideoUpload
  path: String
  bucket: String
  version: VideoUploadFileLinkVersion
  fileType: VideoUploadFileLinkType
}

/*
 * An edge in a connection.

 */
export interface VideoUploadStatusLogItemEdge {
  node: VideoUploadStatusLogItem
  cursor: String
}

export interface VideoUploadStorageLinkSubscriptionPayload {
  mutation: MutationType
  node?: VideoUploadStorageLink
  updatedFields?: String[]
  previousValues?: VideoUploadStorageLinkPreviousValues
}

export interface AggregateVideoUploadAdminMetadata {
  count: Int
}

export interface VideoUploadStorageLinkPreviousValues {
  id: ID_Output
  path: String
  bucket: String
  version: VideoUploadFileLinkVersion
  fileType: VideoUploadFileLinkType
}

/*
 * A connection to a list of items.

 */
export interface VideoUploadAdminMetadataConnection {
  pageInfo: PageInfo
  edges: VideoUploadAdminMetadataEdge[]
  aggregate: AggregateVideoUploadAdminMetadata
}

export interface Date {
  month: Int
  day: Int
  year: Int
}

/*
 * An edge in a connection.

 */
export interface VideoUploadMetadataEdge {
  node: VideoUploadMetadata
  cursor: String
}

export interface VideoUploadMetadataSubscriptionPayload {
  mutation: MutationType
  node?: VideoUploadMetadata
  updatedFields?: String[]
  previousValues?: VideoUploadMetadataPreviousValues
}

export interface AggregateVideoUploadStorageLink {
  count: Int
}

export interface VideoUploadMetadataPreviousValues {
  id: ID_Output
  title?: String
  subtitle?: String
  speakers: Int
  renderStart: Float
  renderEnd: Float
}

/*
 * A connection to a list of items.

 */
export interface VideoUploadStorageLinkConnection {
  pageInfo: PageInfo
  edges: VideoUploadStorageLinkEdge[]
  aggregate: AggregateVideoUploadStorageLink
}

export interface VideoUploadStatusLogItem extends Node {
  id: ID_Output
  status: VideoUploadLogItemStatus
  videoUpload: VideoUpload
  event: VideoUploadLogItemEvent
  createdAt: DateTime
  timesoutAt?: Int
  message?: String
}

export interface BatchPayload {
  count: Long
}

export interface VideoUploadAdminMetadataSubscriptionPayload {
  mutation: MutationType
  node?: VideoUploadAdminMetadata
  updatedFields?: String[]
  previousValues?: VideoUploadAdminMetadataPreviousValues
}

/*
 * An edge in a connection.

 */
export interface VideoUploadEdge {
  node: VideoUpload
  cursor: String
}

export interface VideoUploadAdminMetadataPreviousValues {
  id: ID_Output
  advertisingEnabled: Boolean
}

/*
 * A connection to a list of items.

 */
export interface SpeakerConnection {
  pageInfo: PageInfo
  edges: SpeakerEdge[]
  aggregate: AggregateSpeaker
}

export interface Speaker extends Node {
  id: ID_Output
  name: String
  avatarPath?: String
  title?: String
}

export interface AggregateDate {
  count: Int
}

export interface VideoUploadStatusLogItemSubscriptionPayload {
  mutation: MutationType
  node?: VideoUploadStatusLogItem
  updatedFields?: String[]
  previousValues?: VideoUploadStatusLogItemPreviousValues
}

/*
 * An edge in a connection.

 */
export interface ConversationBlockEdge {
  node: ConversationBlock
  cursor: String
}

export interface VideoUploadStatusLogItemPreviousValues {
  id: ID_Output
  status: VideoUploadLogItemStatus
  event: VideoUploadLogItemEvent
  createdAt: DateTime
  timesoutAt?: Int
  message?: String
}

/*
 * A connection to a list of items.

 */
export interface VideoUploadStatusLogItemConnection {
  pageInfo: PageInfo
  edges: VideoUploadStatusLogItemEdge[]
  aggregate: AggregateVideoUploadStatusLogItem
}

export interface ConversationBlock {
  speaker?: Speaker
  start: Float
  end: Float
  content: String
}

export interface AggregateVideoUploadMetadata {
  count: Int
}

export interface ConversationBlockSubscriptionPayload {
  mutation: MutationType
  node?: ConversationBlock
  updatedFields?: String[]
  previousValues?: ConversationBlockPreviousValues
}

/*
 * An edge in a connection.

 */
export interface VideoUploadStorageLinkEdge {
  node: VideoUploadStorageLink
  cursor: String
}

export interface ConversationBlockPreviousValues {
  start: Float
  end: Float
  content: String
}

export interface UserSubscriptionPayload {
  mutation: MutationType
  node?: User
  updatedFields?: String[]
  previousValues?: UserPreviousValues
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
 * An edge in a connection.

 */
export interface VideoConversationEdge {
  node: VideoConversation
  cursor: String
}

export interface AggregateVideoUploadStatusLogItem {
  count: Int
}

export interface VideoConversationSubscriptionPayload {
  mutation: MutationType
  node?: VideoConversation
  updatedFields?: String[]
  previousValues?: VideoConversationPreviousValues
}

export interface VideoConversation extends Node {
  id: ID_Output
  createdAt: DateTime
  createdBy?: User
  draft?: Boolean
  blocks?: ConversationBlock[]
}

export interface DatePreviousValues {
  month: Int
  day: Int
  year: Int
}

export interface DateSubscriptionPayload {
  mutation: MutationType
  node?: Date
  updatedFields?: String[]
  previousValues?: DatePreviousValues
}

/*
 * An edge in a connection.

 */
export interface VideoUploadAdminMetadataEdge {
  node: VideoUploadAdminMetadata
  cursor: String
}

/*
 * A connection to a list of items.

 */
export interface DateConnection {
  pageInfo: PageInfo
  edges: DateEdge[]
  aggregate: AggregateDate
}

export interface AggregateSpeaker {
  count: Int
}

export interface AggregateVideoUpload {
  count: Int
}

/*
 * A connection to a list of items.

 */
export interface VideoUploadMetadataConnection {
  pageInfo: PageInfo
  edges: VideoUploadMetadataEdge[]
  aggregate: AggregateVideoUploadMetadata
}

/*
The `Boolean` scalar type represents `true` or `false`.
*/
export type Boolean = boolean

/*
The `ID` scalar type represents a unique identifier, often used to refetch an object or as key for a cache. The ID type appears in a JSON response as a String; however, it is not intended to be human-readable. When expected as an input type, any string (such as `"4"`) or integer (such as `4`) input value will be accepted as an ID.
*/
export type ID_Input = string | number
export type ID_Output = string

/*
The `Long` scalar type represents non-fractional signed whole numeric values.
Long can represent values between -(2^63) and 2^63 - 1.
*/
export type Long = string

/*
The `String` scalar type represents textual data, represented as UTF-8 character sequences. The String type is most often used by GraphQL to represent free-form human-readable text.
*/
export type String = string

/*
The `Int` scalar type represents non-fractional signed whole numeric values. Int can represent values between -(2^31) and 2^31 - 1. 
*/
export type Int = number

export type DateTime = Date | string

/*
The `Float` scalar type represents signed double-precision fractional values as specified by [IEEE 754](http://en.wikipedia.org/wiki/IEEE_floating_point). 
*/
export type Float = number