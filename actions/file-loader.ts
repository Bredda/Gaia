"use server";
import { TextLoader } from "langchain/document_loaders/fs/text";

export const loadFile = async (file: File) => {
  const loader = new TextLoader(file);
  const doc = await loader.load();
  return doc[0].pageContent;
};
