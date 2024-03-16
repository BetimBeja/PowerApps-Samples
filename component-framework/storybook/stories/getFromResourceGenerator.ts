
export const generateGetFromResource = (resource:string)=>{
  const xmlResource = new DOMParser().parseFromString(resource, 'text/xml');
  const elements = xmlResource.getElementsByTagNameNS('', 'data');
   const getFromResource = (key: string) => {
    for (let i = 0; i < elements.length; i++) {
      if (elements[i].getAttribute('name') === key) {
        return elements[i].getElementsByTagName('value')[0].innerHTML?.trim();
      }
    }
  };
  return getFromResource;
} 
