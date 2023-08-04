import { NextSeo } from "next-seo";
import React, { ReactElement, useState } from "react";
import MainLayout from "../components/layouts/Main";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Paper from "@mui/material/Paper";
import FinishIcon from "@mui/icons-material/CheckCircleOutline";
import InfoIcon from "@mui/icons-material/Info";

import {
  Timeline as MuiTimeline,
  TimelineItem,
  TimelineSeparator,
  TimelineDot,
  TimelineConnector,
  TimelineContent,
  timelineItemClasses,
} from "@mui/lab";
import { styled } from "@mui/material";
import { useQuery } from "react-query";
import axios from "axios";

const Timeline = styled(MuiTimeline)(({ theme }) => ({
  padding: 0,
  [`& .${timelineItemClasses.root}:before`]: {
    flex: 0,
    padding: 0,
  },
}));

interface TimelineData {
  id: number;
  title: string;
  content: string;
  date: Date;
}

const timelineData: TimelineData[] = [
  {
    id: 0,
    title: "Cara membuat entah",
    content:
      "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Cupiditate quos.",
    date: new Date(),
  },
  {
    id: 1,
    title: "Cara membuat entah juga",
    content: "Lorem ipsum dolor sit amet consectetur.",
    date: new Date(),
  },
  {
    id: 2,
    title: "Cara membuat entah pada akhirnya",
    content:
      "Lorem ipsum dolor sit <b>amet</b> consectetur adipisicing elit. Sed et odio perferendis at ea nisi mollitia maxime incidunt inventore itaque.",
    date: new Date(),
  },
];

interface TimelineFetchResult {
  data: TimelineData[];
  metadata: {
    page: 2;
    hasNextPage: boolean;
  };
}

const timelineDateFormatter = (date: Date | string) => {
  const newDate = date instanceof Date ? date : new Date(date);
  return newDate.toLocaleDateString("id-ID", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  });
};

const Announcement = () => {
  const [page, setpage] = useState<number>(1);
  const params = new URLSearchParams();
  params.set("page", page.toString());
  const { isLoading, data } = useQuery<TimelineFetchResult>({
    queryKey: ["announcements", page],
    queryFn: ({ signal }) =>
      axios
        .get(
          process.env.NEXT_PUBLIC_API_URL +
            "/api/announcement?" +
            params.toString(),
          {
            signal,
          }
        )
        .then((result) => result.data),
    keepPreviousData: true,
  });

  return (
    <Container className="pt-6">
      <Paper className="p-5">
        <Typography component="h1" variant="h4" fontWeight="bold" gutterBottom>
          Pengumuman
        </Typography>
        {isLoading && <Typography>Memuat...</Typography>}
        {!isLoading && typeof data?.data !== "undefined" && (
          <Timeline>
            {!data.data.length && (
              <Typography>Tidak ada informasi sejauh ini</Typography>
            )}
            {data.data.length > 0 && (
              <>
                {data.data.map((value) => (
                  <TimelineItem key={value.id}>
                    <TimelineSeparator>
                      <TimelineDot color="primary">
                        <InfoIcon />
                      </TimelineDot>
                      <TimelineConnector />
                    </TimelineSeparator>
                    <TimelineContent>
                      <Typography gutterBottom variant="body2">
                        {timelineDateFormatter(value.date)}
                      </Typography>
                      <Paper className="p-2" variant="outlined">
                        <Typography
                          variant="body1"
                          fontWeight="bold"
                          textTransform="capitalize"
                          gutterBottom
                        >
                          {value.title}
                        </Typography>
                        <Typography
                          variant="body2"
                          dangerouslySetInnerHTML={{ __html: value.content }}
                        />
                      </Paper>
                    </TimelineContent>
                  </TimelineItem>
                ))}
                <TimelineItem>
                  <TimelineSeparator>
                    <TimelineConnector />
                    <TimelineDot color="success">
                      <FinishIcon />
                    </TimelineDot>
                  </TimelineSeparator>
                  <TimelineContent sx={{ pt: "26px" }}>
                    <Typography fontWeight="bold">
                      Tidak ada lagi pengumuman
                    </Typography>
                  </TimelineContent>
                </TimelineItem>
              </>
            )}
          </Timeline>
        )}
      </Paper>
    </Container>
  );
};

Announcement.getLayout = (page: ReactElement) => (
  <>
    <NextSeo
      title="Pengumuman"
      description="Pengumuman dan informasi mengenai Pendaftaran Siswa Baru(PSB) SMK Bina Taruna Jalancagak"
    />
    <MainLayout>{page}</MainLayout>
  </>
);

export default Announcement;
