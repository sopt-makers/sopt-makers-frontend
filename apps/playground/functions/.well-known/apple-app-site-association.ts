const APPLE_APP_SITE_ASSOCIATION = `{
  "applinks": {
    "details": [
      {
        "appIDs": [
          "95YWTT5L8K.com.sopt-stamp-iOS.release",
          "95YWTT5L8K.com.sopt-stamp-iOS.alpha"
        ],
        "components": [
          { "/": "/*" }
        ]
      }
    ]
  }
}`;

export const onRequest: PagesFunction = () => {
  return new Response(APPLE_APP_SITE_ASSOCIATION, {
    headers: {
      'Content-Type': 'application/json',
    },
  });
};
