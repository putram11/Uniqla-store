    "use client";

    import React from 'react';
    import Link from 'next/link';

    // Hardcoded product data
    const hardcodedProducts = [
    {
        "name": "cunabula caelestis volaticus",
        "slug": "suspendo-tenetur",
        "description": "Ciminatio velociter spero voro demoror vetus voluptas alter copia. Timor coniecto damno comptus usus crinis crebro tametsi. Summisse decumbo virtus calculus vomito utroque bibo aufero aro.\nAdinventitias apto aestas annus deduco capio vehemens. Delibero deporto placeat voluptatibus aeternus deficio. Vis super voluptate autem amicitia capillus vinitor suasoria sufficio deduco.",
        "excerpt": "Thorax saepe deficio adimpleo conitor.",
        "price": 5249399,
        "tags": ["trucido", "talio", "arceo"],
        "thumbnail": "https://loremflickr.com/400/400/cats",
        "images": [
        "https://loremflickr.com/400/400/abstract",
        "https://loremflickr.com/400/400/cats",
        "https://loremflickr.com/400/400/food",
        "https://loremflickr.com/400/400/transport",
        "https://loremflickr.com/400/400/food"
        ],
        "createdAt": "2023-12-15T15:32:06.350Z",
        "updatedAt": "2024-03-18T14:47:12.101Z"
    },
    {
        "name": "vaco decet",
        "slug": "umquam-defendo-vorax",
        "description": "Avarus theatrum deserunt cavus ultio. Quae curatio abeo. Distinctio apud desino adhuc trado.\nAspernatur aestas comes modi. Asper caput rerum absque alii molestiae vestrum usitas sodalitas. Assentator calculus illo.\nMaxime tot depraedor textus auctus. Acidus crapula quae verumtamen delicate absum vulgo alioqui votum sonitus. Voro utor maxime tamquam repudiandae creptio atrocitas crebro.",
        "excerpt": "Absorbeo sursum tres excepturi cupiditas altus.",
        "price": 7675600,
        "tags": ["cimentarius", "adaugeo", "vacuus"],
        "thumbnail": "https://loremflickr.com/400/400/business",
        "images": [
        "https://loremflickr.com/400/400/transport",
        "https://loremflickr.com/400/400/business",
        "https://loremflickr.com/400/400/animals",
        "https://loremflickr.com/400/400/business",
        "https://loremflickr.com/400/400/cats"
        ],
        "createdAt": "2024-01-22T13:15:24.887Z",
        "updatedAt": "2024-01-25T18:19:54.047Z"
    },
    {
        "name": "capitulus conventus",
        "slug": "omnis-arbor-tego",
        "description": "Theologus vindico supplanto. Sed vix verto vulgus xiphias. Civitas dolore angelus patruus comptus attero.\nConfido deputo quos vitiosus sustineo taceo perspiciatis cuius decumbo argentum. Vinum aestivus hic. Catena velit venustas avaritia.\nAduro tabgo tabula iste sophismata delinquo demonstro amor quasi. Vulgivagus beneficium necessitatibus super tredecim. Sunt cui calculus nemo adamo contigo comptus talio.",
        "excerpt": "Cruciamentum contabesco subito aggero.",
        "price": 3768019,
        "tags": ["conforto", "vobis", "rerum"],
        "thumbnail": "https://loremflickr.com/400/400/food",
        "images": [
        "https://loremflickr.com/400/400/nature",
        "https://loremflickr.com/400/400/city",
        "https://loremflickr.com/400/400/technics",
        "https://loremflickr.com/400/400/food",
        "https://loremflickr.com/400/400/sports"
        ],
        "createdAt": "2024-08-09T03:01:50.432Z",
        "updatedAt": "2023-05-17T16:42:21.208Z"
    },
    {
        "name": "capillus mollitia",
        "slug": "voro-cupio-corroboro",
        "description": "Provident deinde corona amplitudo summisse cur avaritia. Amita cunctatio alii victus cruentus. Adstringo comparo adstringo solutio sufficio adnuo rem trado curis comes.\nAeneus aggredior illo apto voluntarius spoliatio ratione certus amet. Uberrime consequuntur calco stella sum supellex utique. Creta deleniti animus amplexus.",
        "excerpt": "Voluptate tricesimus denego currus.",
        "price": 3225477,
        "tags": ["copia", "sursum", "omnis"],
        "thumbnail": "https://loremflickr.com/400/400/cats",
        "images": [
        "https://loremflickr.com/400/400/cats",
        "https://loremflickr.com/400/400/cats",
        "https://loremflickr.com/400/400/cats",
        "https://loremflickr.com/400/400/food",
        "https://loremflickr.com/400/400/food"
        ],
        "createdAt": "2024-03-06T12:32:37.477Z",
        "updatedAt": "2024-06-10T19:39:46.154Z"
    },
    ];
    
const FeaturedProducts = () => {
  return (
    <div className="flex flex-col items-center p-4">
      <h2 className="text-3xl font-bold mb-6">Featured Products</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 w-full max-w-screen-xl">
        {hardcodedProducts.slice(0, 5).map((product) => (
          <div
            key={product.slug}
            className="bg-white shadow-xl overflow-hidden flex flex-col rounded-none h-[600px]" 
          >
            <figure className="flex-shrink-0">
              <img
                src={product.thumbnail}
                alt={product.name}
                className="w-full h-2/3 object-cover" 
              />
            </figure>
            <div className="flex-1 p-6"> 
              <h3 className="text-2xl font-semibold mb-3">{product.name}</h3>
              <p className="text-xl font-bold text-gray-600 mb-2">RP. {product.price.toLocaleString()}</p> 
              <p className="text-gray-700">{product.excerpt}</p>
            </div>
          </div>
        ))}
      </div>
      <Link href="/products">
        <button className="mt-6 px-6 py-3 bg-white text-black hover:bg-gray-300 border border-black rounded-lg text-lg">
          See All
        </button>
      </Link>
    </div>
  );
};

export default FeaturedProducts;
