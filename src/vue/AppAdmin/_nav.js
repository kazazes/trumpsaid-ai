export default {
  items: [
    {
      name: 'Dashboard',
      url: '/dashboard',
      icon: 'icon-speedometer',
      badge: {
        variant: 'primary',
        text: 'NEW'
      }
    },
    {
      title: true,
      name: 'Media',
      class: '',
      wrapper: {
        element: '',
        attributes: {}
      }
    },
    {
      name: 'Video',
      url: '/video',
      icon: 'icon-puzzle',
      children: [
        {
          name: 'Manage',
          url: '/base/breadcrumbs',
          icon: 'icon-puzzle'
        },
        {
          name: 'Create New',
          url: '/base/cards',
          icon: 'icon-puzzle'
        }
      ]
    }
  ]
}
