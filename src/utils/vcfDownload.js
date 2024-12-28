const vcfDownload = ({ phoneNumber, name }) => {
   // Prepare the vCard content
   const vCardContent = `
BEGIN:VCARD
VERSION:3.0
FN:${name}
TEL:${phoneNumber}
END:VCARD
`.trim();

   // Create a Blob for the vCard file
   const blob = new Blob([vCardContent], { type: 'text/vcard' });

   // Create a temporary anchor element to trigger the download
   const link = document.createElement('a');
   link.href = URL.createObjectURL(blob);
   console.log("Cvdf", link.href);
   
   link.download = 'contact.vcf'; // Filename for the downloaded vCard
   document.body.appendChild(link);
   link.click();

   // Clean up the DOM
   document.body.removeChild(link);
};

export default vcfDownload;