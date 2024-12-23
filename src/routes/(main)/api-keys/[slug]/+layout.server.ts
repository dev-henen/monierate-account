export async function load({ params }) {
    const { slug } = params;
    //console.log(slug);
    
    return {
        appID: slug
    };
  }
  