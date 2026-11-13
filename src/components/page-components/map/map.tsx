import { client } from "@/utils/constants";
import { configData } from "@/utils/types";
import CustomMap from "./custom-map";

export default async function Map() {

  const data: Omit<configData, 'email' | 'copyright' | 'imageUrl' | 'address' | 'phoneNumber' | 'socialLinks'> = await client.fetch({
    query: `*[_type=='config'][0]{
  
  "countries":[...countries[]{
    name,
      "iconUrl":icon.asset->url,
      "coords":[points.lat,points.lng]
  }]
}`, config: {
      cache: 'no-cache'
    }
  })

  return <CustomMap data={data.countries!} />

}