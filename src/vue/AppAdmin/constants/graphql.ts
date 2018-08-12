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
      speakers
      renderStart
      renderEnd
      conversations {
        id
        blocks {
          speaker {
            name
          }
          start
          end
          content
        }
      }
    }
    storageLinks {
      id
      path
      bucket
      version
      fileType
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
