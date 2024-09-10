import type { NextPage } from "next";
import { getStoryblokApi, ISbStoriesParams } from "@storyblok/react/rsc";
import StoryblokStory from "@storyblok/react/story";

type Props = {
  params: { locale: string };
};
async function fetchData(locale = "nl") {
  const sbParams: ISbStoriesParams = {
    version: "draft",
    resolve_links: "url",
    language: locale,
  };

  const storyblokApi = getStoryblokApi();
  return storyblokApi.get(`cdn/stories/home`, sbParams, { cache: "no-store" });
}
const Home: NextPage<Props> = async ({ params: { locale } }) => {
  const { data } = await fetchData(locale);
  console.log(data);
  return (
    <div>
      <h1>{data.story.name}</h1>
      <StoryblokStory story={data.story} />
    </div>
  );
};

export default Home;
