const vcfDownload = ({ phoneNumber, name, email, address, city, pincode }) => {

   // Prepare the vCard content
   const vCardContent = `
BEGIN:VCARD
VERSION:3.0
FN:${name}
TEL:${phoneNumber}
EMAIL:${email || ''}
ADR:;;${address || ''};${city || ''};;${pincode || ''};
NOTE:This vCard was powered by MagicQR.
END:VCARD
`.trim();

   try {
      // Create a Blob for the vCard file
      const blob = new Blob([vCardContent], { type: 'text/vcard;charset=utf-8' });
      const objectURL = URL.createObjectURL(blob);

      // Create a temporary anchor element to trigger the download
      const link = document.createElement('a');
      link.href = objectURL;
      link.download = `${name.replace(/\s+/g, '_') || 'contact'}.vcf`;
      document.body.appendChild(link);
      link.click();

      // Clean up the DOM and memory
      document.body.removeChild(link);
      URL.revokeObjectURL(objectURL);
      console.log('vCard download initiated successfully');
   } catch (error) {
      console.error('Failed to generate vCard:', error);
   }
};

export default vcfDownload;
