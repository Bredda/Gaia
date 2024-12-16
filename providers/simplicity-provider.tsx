"use client";

import { SimplicityThread } from "@/types/simplicity-thread.types";
import { createContext, useRef, useState } from "react";
import { nanoid } from "nanoid";
const staticThread = {
  id: "34F656jaYGhLXD5jw3F1WE",
  request: {
    query: "is ai in a hype cycle ?",
  },
  title: "Exploring AI's Position in the Hype Cycle",
  response: {
    queries: [
      "current status of AI in the hype cycle",
      "AI technology hype cycle analysis 2023",
      "trends in AI development and hype cycle",
    ],
    videos: [
      {
        content: "https://www.youtube.com/watch?v=jB1RDz9jaj0",
        description:
          "For more about Gartner Hype Cycles, visit https://www.gartner.com/en/research/methodologies/gartner-hype-cycle. Gartner's Hype Cycles, of which there are about 100, provide an objective map that helps you understand the real risks and opportunities of a technological innovation, so you can smooth out the technology adoption process. We look at ...",
        duration: "3:37",
        embed_html:
          '<iframe width="1280" height="720" src="https://www.youtube.com/embed/jB1RDz9jaj0?autoplay=1" frameborder="0" allowfullscreen></iframe>',
        embed_url: "https://www.youtube.com/embed/jB1RDz9jaj0?autoplay=1",
        image_token:
          "5f4c2ccbc507b95a56dd62a1cb83bf3e7be570610faa0aeab1443d681065e477",
        images: {
          large:
            "https://tse3.mm.bing.net/th?id=OVP.JGGbTrAgMSmG1wDZcxFytwHgFo&pid=Api",
          medium:
            "https://tse3.mm.bing.net/th?id=OVP.JGGbTrAgMSmG1wDZcxFytwHgFo&pid=Api",
          motion:
            "https://tse1.mm.bing.net/th?id=OM.runQhSezQQE9CQ_1723566942&pid=Api",
          small:
            "https://tse3.mm.bing.net/th?id=OVP.JGGbTrAgMSmG1wDZcxFytwHgFo&pid=Api",
        },
        provider: "Bing",
        published: "2022-03-24T13:02:08.0000000",
        publisher: "YouTube",
        statistics: {
          viewCount: 100235,
        },
        title: "Gartner Hype Cycles, Explained",
        uploader: "Gartner",
      },
      {
        content: "https://www.youtube.com/watch?v=BrBBsxhb0b0",
        description:
          "For more insights about generative AI, visit: https://gtnr.it/46oMqwI In the fourth episode of Top of Mind, Chris Howard, Gartner Global Chief of Research, discusses where generative AI is on the Gartner Hype Cycle. He also addresses the significance and possibilities of AGI, the advancements made so far, and the potential ethical and societal ...",
        duration: "7:36",
        embed_html:
          '<iframe width="1280" height="720" src="https://www.youtube.com/embed/BrBBsxhb0b0?autoplay=1" frameborder="0" allowfullscreen></iframe>',
        embed_url: "https://www.youtube.com/embed/BrBBsxhb0b0?autoplay=1",
        image_token:
          "f101a22f3d96cb374c44e9c98dc77db2c75d484427f941986314197f497cdb3a",
        images: {
          large:
            "https://tse3.mm.bing.net/th?id=OVP.rj1ss0kA0N9YtJzdS3UK9wHgFo&pid=Api",
          medium:
            "https://tse3.mm.bing.net/th?id=OVP.rj1ss0kA0N9YtJzdS3UK9wHgFo&pid=Api",
          motion:
            "https://tse3.mm.bing.net/th?id=OM.4bIuhnhS3UIbog_1724206827&pid=Api",
          small:
            "https://tse3.mm.bing.net/th?id=OVP.rj1ss0kA0N9YtJzdS3UK9wHgFo&pid=Api",
        },
        provider: "Bing",
        published: "2023-06-13T13:00:08.0000000",
        publisher: "YouTube",
        statistics: {
          viewCount: 19818,
        },
        title: "The Gartner Hype Cycle, Generative AI and the Future of AI",
        uploader: "Gartner",
      },
      {
        content:
          "https://finance.yahoo.com/video/apple-ai-hype-jobs-report-202052357.html",
        description:
          "Catalysts Host Seana Smith takes a look at the headlines moving the market with top Wall Street and economics experts. After Apple (AAPL) reported quarterly results that beat estimates, Maxim Group managing director and senior consumer internet analyst Tom Forte outlines how the iPhone makers' delayed Apple Intelligence launch is a \"real risk ...",
        duration: "",
        embed_html: "",
        embed_url: "",
        image_token:
          "6d46c170820ac2cf0842406baabde80b98238a2622a031a3e9badf591e44a0e8",
        images: {
          large:
            "https://tse1.mm.bing.net/th?id=OVF.d0wxh5kuyloHYaT1oTrZLA&pid=Api",
          medium:
            "https://tse1.mm.bing.net/th?id=OVF.d0wxh5kuyloHYaT1oTrZLA&pid=Api",
          motion: "",
          small:
            "https://tse1.mm.bing.net/th?id=OVF.d0wxh5kuyloHYaT1oTrZLA&pid=Api",
        },
        provider: "Bing",
        published: "2024-11-01T20:20:52.0000000",
        publisher: "Yahoo",
        statistics: {
          viewCount: null,
        },
        title: "Apple AI hype, jobs report, US manufacturing: Catalysts",
        uploader: "Yahoo Finance Video",
      },
      {
        content: "https://www.youtube.com/watch?v=X_ne-9CP4wI",
        description:
          "Deep Dive into AI: Understanding Learning, Risks, and Future Impacts In this insightful episode, we explore the multifaceted world of artificial intelligence and machine learning. We unravel the complexities of training large language models, comparing their learning abilities to human learning processes, and introduce concepts like 'spective ...",
        duration: "57:25",
        embed_html:
          '<iframe width="1280" height="720" src="https://www.youtube.com/embed/X_ne-9CP4wI?autoplay=1" frameborder="0" allowfullscreen></iframe>',
        embed_url: "https://www.youtube.com/embed/X_ne-9CP4wI?autoplay=1",
        image_token:
          "fc59ded493baa4a4b1aaba9daa0285b91ff0ab2f1d3ab1cd3a4ffd9b5e7f2b3f",
        images: {
          large:
            "https://tse4.mm.bing.net/th?id=OVF.KJX%2fV0GHkRuLxOLWfm%2bI5w&pid=Api",
          medium:
            "https://tse4.mm.bing.net/th?id=OVF.KJX%2fV0GHkRuLxOLWfm%2bI5w&pid=Api",
          motion: "",
          small:
            "https://tse4.mm.bing.net/th?id=OVF.KJX%2fV0GHkRuLxOLWfm%2bI5w&pid=Api",
        },
        provider: "Bing",
        published: "2024-11-05T17:41:57.0000000",
        publisher: "YouTube",
        statistics: {
          viewCount: 2,
        },
        title:
          "2023 AI Symposium Deep Dive into AI: Understanding Learning, Risks, and Future Impacts",
        uploader: "newpush",
      },
      {
        content:
          "https://www.gartner.com/en/articles/the-4-trends-that-prevail-on-the-gartner-hype-cycle-for-ai-2021",
        description:
          "What trends will dominate this year's #AI landscape? Take a look at Gartner's Hype Cycle for AI, 2021 to find out. #GartnerSYM",
        duration: "",
        embed_html: "",
        embed_url: "",
        image_token:
          "47d10c1c888b05e719b0cb5f8fe282e71ffcb09746a7865def09bfc0c3cb915a",
        images: {
          large:
            "https://tse4.mm.bing.net/th?id=OVP.Isat32v_uDgMs70lD8S9UAIIHd&pid=Api",
          medium:
            "https://tse4.mm.bing.net/th?id=OVP.Isat32v_uDgMs70lD8S9UAIIHd&pid=Api",
          motion: "",
          small:
            "https://tse4.mm.bing.net/th?id=OVP.Isat32v_uDgMs70lD8S9UAIIHd&pid=Api",
        },
        provider: "Bing",
        published: "2021-09-22T00:00:00.0000000",
        publisher: "gartner.com",
        statistics: {
          viewCount: null,
        },
        title:
          "The 4 Trends That Prevail on the Gartner Hype Cycle for AI, 2021",
        uploader: "",
      },
      {
        content: "https://www.youtube.com/watch?v=jB1RDz9jaj0",
        description:
          "For more about Gartner Hype Cycles, visit https://www.gartner.com/en/research/methodologies/gartner-hype-cycle. Gartner's Hype Cycles, of which there are about 100, provide an objective map that helps you understand the real risks and opportunities of a technological innovation, so you can smooth out the technology adoption process. We look at ...",
        duration: "3:37",
        embed_html:
          '<iframe width="1280" height="720" src="https://www.youtube.com/embed/jB1RDz9jaj0?autoplay=1" frameborder="0" allowfullscreen></iframe>',
        embed_url: "https://www.youtube.com/embed/jB1RDz9jaj0?autoplay=1",
        image_token:
          "5f4c2ccbc507b95a56dd62a1cb83bf3e7be570610faa0aeab1443d681065e477",
        images: {
          large:
            "https://tse3.mm.bing.net/th?id=OVP.JGGbTrAgMSmG1wDZcxFytwHgFo&pid=Api",
          medium:
            "https://tse3.mm.bing.net/th?id=OVP.JGGbTrAgMSmG1wDZcxFytwHgFo&pid=Api",
          motion:
            "https://tse1.mm.bing.net/th?id=OM.runQhSezQQE9CQ_1723566942&pid=Api",
          small:
            "https://tse3.mm.bing.net/th?id=OVP.JGGbTrAgMSmG1wDZcxFytwHgFo&pid=Api",
        },
        provider: "Bing",
        published: "2022-03-24T13:02:08.0000000",
        publisher: "YouTube",
        statistics: {
          viewCount: 100235,
        },
        title: "Gartner Hype Cycles, Explained",
        uploader: "Gartner",
      },
    ],
    images: [
      {
        title:
          "The 4 Trends That Prevail on the Gartner Hype Cycle for AI, 2021",
        image:
          "https://emtemp.gcom.cloud/ngw/globalassets/en/articles/images/the-4-trends-that-prevail-on-the-gartner-hype-cycle-for-ai--2021-0.png",
        thumbnail:
          "https://tse1.mm.bing.net/th?id=OIP.G47CxCS6L6sp3q7g4CIriAHaGz&pid=Api",
        url: "https://www.gartner.com/en/articles/the-4-trends-that-prevail-on-the-gartner-hype-cycle-for-ai-2021",
        height: 1125,
        width: 1224,
        source: "Bing",
      },
      {
        title:
          "What's New in Artificial Intelligence from the 2022 Gartner Hype Cycle ...",
        image:
          "https://i0.wp.com/emtemp.gcom.cloud/ngw/globalassets/en/articles/images/hype-cycle-for-artificial-intelligence-2022.png",
        thumbnail:
          "https://tse1.mm.bing.net/th?id=OIP.K447uibLNAmcqBmTBGgzVwHaG0&pid=Api",
        url: "https://msswao.com/article/what-s-new-in-artificial-intelligence-from-the-2022-gartner-hype-cycle",
        height: 1125,
        width: 1223,
        source: "Bing",
      },
      {
        title:
          "Hype Cycle for AI Technologies in Business - Omniscien Technologies",
        image:
          "https://omniscien.com/wp-content/uploads/2023/01/Omniscien-Technologies-Hype-Cycle-for-AI-Technologies-in-Business-January-2023.png",
        thumbnail:
          "https://tse2.mm.bing.net/th?id=OIP.dba-ls9D4fh_UFBxnejEpAHaEd&pid=Api",
        url: "https://omniscien.com/blog/hype-cycle-for-ai-technologies-in-business/",
        height: 1035,
        width: 1717,
        source: "Bing",
      },
      {
        title:
          "Cycle de Hype de Gartner pour l'IA en 2023 - Intelligence Powered Girl",
        image:
          "https://www.kdnuggets.com/wp-content/uploads/arya_gartner_hype_cycle_ai_2023_1-1024x573.png",
        thumbnail:
          "https://tse3.mm.bing.net/th?id=OIP.oLEd7c5vz502qVgmTSuagwHaEJ&pid=Api",
        url: "https://www.ipgirl.com/gartners-hype-cycle-for-ai-in-2023.html",
        height: 573,
        width: 1024,
        source: "Bing",
      },
      {
        title:
          "The 4 Trends That Prevail on the Gartner Hype Cycle for AI, 2021",
        image:
          "https://emtemp.gcom.cloud/ngw/globalassets/en/articles/images/the-4-trends-that-prevail-on-the-gartner-hype-cycle-for-ai--2021-0.png",
        thumbnail:
          "https://tse1.mm.bing.net/th?id=OIP.G47CxCS6L6sp3q7g4CIriAHaGz&pid=Api",
        url: "https://www.gartner.com/en/articles/the-4-trends-that-prevail-on-the-gartner-hype-cycle-for-ai-2021",
        height: 1125,
        width: 1224,
        source: "Bing",
      },
      {
        title:
          "2 Trends on the Gartner Hype Cycle for Artificial Intelligence, 2020",
        image:
          "https://images-cdn.newscred.com/Zz1mOWJhNzlkNDA2ZTMxMWViYjRiOGFiM2IyMjQ1YmMwZQ==",
        thumbnail:
          "https://tse3.mm.bing.net/th?id=OIP.NT2j_bgfRhxiu5yflkxXvwHaHC&pid=Api",
        url: "https://www.gartner.com/smarterwithgartner/2-megatrends-dominate-the-gartner-hype-cycle-for-artificial-intelligence-2020/",
        height: 1164,
        width: 1224,
        source: "Bing",
      },
    ],
    sources: [
      {
        title:
          "What's New in Artificial Intelligence from the 2023 Gartner Hype Cycle",
        href: "https://www.gartner.com/en/articles/what-s-new-in-artificial-intelligence-from-the-2023-gartner-hype-cycle",
        body: "The 2023 Gartner Hype Cycle™ for Artificial Intelligence (AI) identifies innovations and techniques that offer significant and even transformational benefits while also addressing the limitations and risks of fallible systems. AI strategies should consider which offer the most credible cases for investment. Download Now: A Workbook for ...",
      },
      {
        title: "The Generative AI Hype Is Almost Over. What's Next? - Forbes",
        href: "https://www.forbes.com/sites/christianstadler/2024/09/06/the-generative-ai-hype-is-almost-over-whats-next/",
        body: "According to the Gartner hype cycle, inflated expectations will be followed by a trough of disillusionment. Generative AI (GenAI) is probably at this turning point right now, a Gartner report in ...",
      },
      {
        title:
          "What's New in Artificial Intelligence from the 2023 Gartner Hype Cycle",
        href: "https://www.gartner.com/en/articles/what-s-new-in-artificial-intelligence-from-the-2023-gartner-hype-cycle",
        body: "The 2023 Gartner Hype Cycle™ for Artificial Intelligence (AI) identifies innovations and techniques that offer significant and even transformational benefits while also addressing the limitations and risks of fallible systems. AI strategies should consider which offer the most credible cases for investment.",
      },
      {
        title: "Hype Cycle for Artificial Intelligence, 2023 - Gartner",
        href: "https://www.gartner.com/en/documents/4543699",
        body: "Learn how generative AI and ChatGPT have elevated AI discussions to new levels and how data and analytics leaders can create credible cases for investment. See the five phases of the Hype Cycle and the evidence-backed insight for each innovation on this year's map.",
      },
      {
        title:
          "What's New in Artificial Intelligence from the 2023 Gartner Hype Cycle",
        href: "https://www.gartner.com/en/articles/what-s-new-in-artificial-intelligence-from-the-2023-gartner-hype-cycle",
        body: "The 2023 Gartner Hype Cycle™ for Artificial Intelligence (AI) identifies innovations and techniques that offer significant and even transformational benefits while also addressing the limitations and risks of fallible systems. AI strategies should consider which offer the most credible cases for investment. Download Now: A Workbook for ...",
      },
      {
        title: "The Top Artificial Intelligence Trends - IBM",
        href: "https://www.ibm.com/think/insights/artificial-intelligence-trends",
        body: "Here are some important current AI trends to look out for in the coming year. Reality check: more realistic expectations. Multimodal AI. Small (er) language models and open source advancements. GPU shortages and cloud costs. Model optimization is getting more accessible. Customized local models and data pipelines.",
      },
    ],
    response:
      "Yes, artificial intelligence (AI) is currently in a hype cycle, as indicated by the 2023 Gartner Hype Cycle. The hype cycle is a graphical representation that illustrates the maturity, adoption, and social application of specific technologies, including AI. It typically consists of several phases: innovation trigger, peak of inflated expectations, trough of disillusionment, slope of enlightenment, and plateau of productivity.\n\nAs of now, AI technologies, particularly generative AI, are at a critical juncture. They are nearing the \"Trough of Disillusionment,\" which follows a period of inflated expectations. This suggests that while there has been significant excitement and high hopes for AI's transformative potential, the reality may not fully meet those expectations. The Gartner report highlights that AI is experiencing a shift towards more realistic expectations and emphasizes the importance of integrating AI into existing business processes to realize its full potential.\n\nFor more detailed insights, you can refer to the original article on Gartner's website.",
  },
};

interface SimplicityState {
  thread: SimplicityThread | null;
  sendRequest: (data: any) => void;
  isGenerating: boolean;
}

export const SimplicityContext = createContext<SimplicityState | undefined>(
  undefined
);

export const SimplicityProvider = ({ children }: { children: any }) => {
  const [isGenerating, setIsGenerating] = useState(false);
  const aggragatedTokens = useRef("");
  const [thread, setThread] = useState<SimplicityThread | null>(staticThread);

  const handleTitleQueries = (message: any) => {
    const data = JSON.parse(message.data);
    setThread((prev) => ({
      id: prev!.id,
      request: prev!.request,
      title: data.title,
      response: { queries: data.queries },
    }));
    console.log(thread);
  };

  const handleSources = (message: any) => {
    const flattenData = message.data.reduce(
      (flat: any, val: any) => flat.concat(val),
      []
    );
    setThread((prev) => ({
      id: prev!.id,
      request: prev!.request,
      title: prev!.title,
      response: { ...prev!.response, sources: flattenData },
    }));
    console.log(thread);
  };

  const handleFinalAnswer = (message: any) => {
    setThread((prev) => ({
      id: prev!.id,
      request: prev!.request,
      title: prev!.title,
      response: { ...prev!.response, response: message.data },
    }));
    console.log(thread);
    setIsGenerating(false);
  };

  const handleAnswerToken = (message: any) => {
    aggragatedTokens.current += message.data;
    setThread((prev) => ({
      id: prev!.id,
      request: prev!.request,
      title: prev!.title,
      response: { ...prev!.response, response: aggragatedTokens.current },
    }));
  };

  const handleImages = (message: any) => {
    setThread((prev) => ({
      id: prev!.id,
      request: prev!.request,
      title: prev!.title,
      response: { ...prev!.response, images: message.data },
    }));
  };
  const handleVideos = (message: any) => {
    setThread((prev) => ({
      id: prev!.id,
      request: prev!.request,
      title: prev!.title,
      response: { ...prev!.response, videos: message.data },
    }));
  };

  const sendRequest = (data: any) => {
    const id = nanoid(8);
    aggragatedTokens.current = "";
    setIsGenerating(true);
    setThread({
      id,
      request: {
        query: data,
      },
    });
    console.log("send request", {
      id,
      request: {
        query: data,
      },
    });
  };

  return (
    <SimplicityContext.Provider value={{ thread, sendRequest, isGenerating }}>
      {children}
    </SimplicityContext.Provider>
  );
};
