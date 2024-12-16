import { NextRequest, NextResponse } from "next/server"; // To handle the request and response
import { promises as fs } from "fs"; // To save the file temporarily
import { v4 as uuidv4 } from "uuid"; // To generate a unique filename
import PDFParser from "pdf2json";

export async function POST(req: NextRequest) {
  const formData: FormData = await req.formData();
  const uploadedFile = formData.get("file");
  let fileName = "";
  let parsedText = "";

  console.log("Uploaded file:", uploadedFile);

  if (uploadedFile instanceof File) {
    fileName = uuidv4();

    const tempFilePath = `/tmp/${fileName}.pdf`;

    const fileBuffer = Buffer.from(await uploadedFile.arrayBuffer());

    await fs.writeFile(tempFilePath, fileBuffer);
    const pdfParser = new (PDFParser as any)(null, 1);

    pdfParser.on("pdfParser_dataError", (errData: any) =>
      console.log(errData.parserError)
    );

    pdfParser.on("pdfParser_dataReady", () => {
      console.log((pdfParser as any).getRawTextContent());
      parsedText = (pdfParser as any).getRawTextContent();
    });

    await new Promise((resolve, reject) => {
      pdfParser.loadPDF(tempFilePath);
      pdfParser.on("pdfParser_dataReady", resolve);
      pdfParser.on("pdfParser_dataError", reject);
    });
  } else {
    console.log("Uploaded file is not in the expected format.");
    return new NextResponse("Uploaded file is not in the expected format.", {
      status: 500,
    });
  }

  const response = new NextResponse(parsedText);
  response.headers.set("FileName", fileName);
  return response;
}
