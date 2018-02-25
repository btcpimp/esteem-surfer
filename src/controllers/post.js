export default ($scope, $rootScope, $routeParams, $filter, $uibModal, $location, steemService, helperService) => {

  let parent = $routeParams.parent;
  let author = $routeParams.author;
  let permlink = $routeParams.permlink;

  let routePath = `/${parent}/@${author}/${permlink}`;
  let contentPath = `${author}/${permlink}`;

  let pathData = {};

  const compileComments = (parent, sortField = 'pending_payout_value') => {
    let comments = [];
    for (let k of parent.replies) {
      let reply = pathData.content[k];

      comments.push(
        Object.assign(
          {},
          reply,
          {comments: compileComments(reply)},
          {author_data: pathData.accounts[reply.author]}
        )
      )
    }

    comments.sort(function (a, b) {
      let keyA = a[sortField],
        keyB = b[sortField];

      if (keyA > keyB) return -1;
      if (keyA < keyB) return 1;
      return 0;
    });

    return comments
  };

  $scope.loadingPost = true;

  steemService.getState(routePath).then((stateData) => {

    pathData = stateData;

    let post = stateData.content[contentPath];

    $scope.post = post;

    $scope.author_data = pathData.accounts[author];

    // Sometimes tag list comes with duplicate items. Needs to singularize.
    $scope.postTags = [...new Set(JSON.parse(post.json_metadata).tags)];

    $scope.comments = compileComments(post);

    // Mark post as read
    helperService.setPostRead(post.id);
  }).catch((e) => {

    // TODO: Handle catch
  }).then(() => {
    $scope.loadingPost = false;
  });


  $scope.parentClicked = () => {
    let u = `/posts/${$rootScope.selectedFilter}/${$scope.post.parent_permlink}`;
    $location.path(u);
  };

  $scope.tagClicked = (tag) => {
    let u = `/posts/${$rootScope.selectedFilter}/${tag}`;
    $location.path(u);
  }
};