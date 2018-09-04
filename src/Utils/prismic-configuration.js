export const linkResolver = function(doc) {
  // Pretty URLs for known types
  if (doc.type === "blog") return "/post/" + doc.uid;
  if (doc.type === "page") return "/" + doc.uid;
  // Fallback for other types, in case new custom types get created
  return "/doc/" + doc.id;
};

export const fetchArticle = (article_link, type) => {
  let { title, subtitle, hero_image, module_type } = article_link.data;

  // add in logic to make sure it doesnt error out if any of these fields were left blank
  title = title[0].text;
  subtitle = subtitle[0].text;
  hero_image = hero_image.url;

  return {
    title,
    subtitle,
    hero_image,
    module_type,
    type
  };
};

export const fetchResource = (resource_link, type) => {
  let { title, subtitle, thumbnail, module_type } = resource_link.data;

  // add in logic to make sure it doesnt error out if any of these fields were left blank
  console.log(resource_link);
  title = title[0].text;
  subtitle = subtitle[0].text;
  thumbnail = thumbnail.url;

  return {
    title,
    subtitle,
    thumbnail,
    module_type,
    type
  };
};
