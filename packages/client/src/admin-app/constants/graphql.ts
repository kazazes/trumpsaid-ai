import gql from 'graphql-tag';

export const DELETE_VIDEO_UPLOAD = gql`
  mutation($id: ID!) {
    deleteVideoUpload(id: $id) {
      id
    }
  }
  `;

export const LIST_UPLOADS = gql`
  query {
    videoUploads {
      id
      submitedUrl
      submitedBy {
        displayName
        id
        avatar
      }
      createdAt
    }
  }
`;

export const VIDEO_UPLOAD_DETAILS = gql`
query videoUpload($videoSubmissionId: ID!) {
  videoUpload(id: $videoSubmissionId) {
    id
    submitedBy {
      id
      displayName
      avatar
    }
    submitedUrl
    metadata {
      title
      subtitle
      dateRecorded {
        day
        month
        year
      }
      speakers
      renderStart
      renderEnd
      newsSources {
        id
        createdAt
        source {
          id
          name
          avatarPath
        }
        url
        title
        reachable
        author
        publishedDate
        lastAccessed
        lang
        logo
        description
        publisher
      }
      conversations {
        id
        createdAt
        createdBy {
          id
        }
        blocks {
          speaker {
            name
          }
          start
          end
          content
          entityMentions {
            entity {
              id
              name
              type
            }
            salience
            sentiment
          }
        }
      }
    }
    storageLinks {
      id
      path
      bucket
      version
      fileType
      mimeType
    }
  }
}
`;

export const CREATE_VIDEO_UPLOAD = gql`
mutation($url: String!) {
  createVideoUpload(url: $url) {
    id
  }
}
`;

export const SET_INITIAL_UPLOAD_METADATA = gql`
mutation($id: ID!, $thumbnailTimestamp: Float!, $renderStart: Float!, $renderEnd: Float!, $numberOfSpeakers: Int!) {
  setInitialUploadMetadata(
    id: $id, thumbnailTimestamp: $thumbnailTimestamp, renderEnd: $renderEnd,
    renderStart: $renderStart, numberOfSpeakers: $numberOfSpeakers) {
      id
  }
}
`;

export const LIST_SPEAKERS = gql`
query {
  allSpeakers {
    name
    avatarPath
    title
  }
}
`;

export const CREATE_CONVERSATION = gql`
mutation($videoId: ID!, $blocks: [ConversationBlockCreateInput!]!) {
  createConversation(videoId: $videoId, blocks: $blocks) {
    id
  }
}
`;

export const UPDATE_METADATA = gql`
mutation($id: ID!, $metadata: VideoUploadMetadataUpdateInput!) {
  updateMetadata(id: $id, metadata: $metadata) {
    id
  }
}
`;

export const ADD_NEWS_SOURCE_ITEMS = gql`
mutation($id: ID!, $newsItemCreateInputs: NewsSourceItemCreateManyInput) {
  addNewsSourceItems(id: $id, newsItemCreateInputs: $newsItemCreateInputs) {
    metadata {
      newsSources {
        url
        createdAt
      }
    }
  }
}
`;

export const DELETE_NEWS_SOURCE_ITEM = gql`
mutation($id: ID!) {
  deleteNewsSourceItem(id: $id)
}
`;
