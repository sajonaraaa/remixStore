import { LoaderFunctionArgs, json } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import React from "react";
import { client } from "~/lib/sanity";
import { Tab } from "@headlessui/react";
import { ProductId } from "~/lib/interface";
import { urlFor } from "~/lib/sanityImageUrl";
import { useLove } from "~/lib/useCart";

interface iAppProps {
  data: ProductId;
}

export async function loader({ params }: LoaderFunctionArgs) {
  const query = `*[_type == "product" && slug.current == '${params.slug}'][0]`;
  const data = await client.fetch(query);

  return json({ data });
}

function classNames(...classes: any) {
  return classes.filter(Boolean).join(" ");
}

const ProductSlug = () => {
  const { data } = useLoaderData<typeof loader>() as iAppProps;
  const addToCart = useLove((state) => state.addToCart);
  return (
    <main className="mt-5">
      <div className="lg:grid lg:grid-cols-2 lg:gap-x-8 lg:items-start">
        <Tab.Group as="div" className="flex flex-col-reverse">
          <div className="hidden mt-6 w-full max-w-2xl mx-auto sm:block lg:max-w-none">
            <Tab.List className="grid grid-cols-4 gap-6">
              {data.image.map((image) => (
                <Tab
                  key={image._key}
                  className="relative h-24 bg-white rounded-md flex items-center justify-center text-sm font-medium uppercase text-gray-900 cursor-pointer hover:bg-gray-50 focus:outline-none focus:ring focus:ring-offset-4 focus:ring-opacity-50"
                >
                  {({ selected }) => (
                    <>
                      <span className="absolute inset-0 rounded-md overflow-hidden">
                        <img
                          src={urlFor(image).url()}
                          alt="What a fantastic piece of work"
                          className="w-full h-full object-center object-cover"
                        />
                      </span>
                      <span
                        className={classNames(
                          selected ? "ring-purple-200" : "ring-transparent",
                          "absolute inset-0 rounded-md ring-2 ring-offset-2 pointer-events-none"
                        )}
                      />
                    </>
                  )}
                </Tab>
              ))}
            </Tab.List>
          </div>
          <Tab.Panels className="w-full aspect-w-1 aspect-h-1">
            {data.image.map((image) => (
              <Tab.Panel key={image._key}>
                <img
                  src={urlFor(image).url()}
                  alt="What a fantastic piece of work"
                  className="w-full h-full object-center object-cover sm:rounded-lg"
                />
              </Tab.Panel>
            ))}
          </Tab.Panels>
        </Tab.Group>
        <div className="mt-10 px-4 sm:px-0 sm:mt-16 lg:mt-0">
          <h1 className="text-3xl font-extrabold tracking-tight text-cyan-300">
            {data.name}
          </h1>
          <div className="mt-3">
            <p className="text-3xl text-zinc-400">${data.price}</p>
          </div>
          <div className="mt-6">
            <div
              className="text-base text-gray-700"
              dangerouslySetInnerHTML={{ __html: data.description }}
            />
          </div>
          <div className="mt=6">
            <div className="mt-10 flex sm:flex-col-1">
              <button
                onClick={() => {
                  addToCart(data);
                }}
                className="w-full flex-1 bg-purple-300 border border-transparent rounded-md py-3 flex items-center justify-center text-base font-md text-gray-900 hover:bg-purple-200"
              >
                Bring it home!
              </button>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default ProductSlug;
