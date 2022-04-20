import { GetStaticProps } from "next";
import { useState } from "react";
import { Htag, Input, Tag, Textarea } from "../components";
import { Button } from "../components";
import { Paragraph } from "../components";
import { Rating } from "../components";
import { withLayout } from "../layout/Layout";
import axios from "axios";
import { MenuItem } from "../interfaces/menu.interface";
import { TopLevelCategory } from "../interfaces/page.interface";
import { API } from "../helpers/api";

function Home({ menu }: HomeProps): JSX.Element {
  const [rating, setRating] = useState<number>(4);

  return (
    <>
      <Htag tag="h1">Текст</Htag>

      <Button appearance="primary">
        Кнопка
      </Button>

      <Button appearance="primary" arrow="right">
        Кнопка со стрелкой
      </Button>

      <Paragraph>Текст</Paragraph>

      <Tag size='s'>Ghost</Tag>
      <Tag size='m' color='red'>Red</Tag>
      <Tag size='m' color='green'>Green</Tag>
      <Tag size='s' color='primary'>Green</Tag>

      <Rating rating={rating} isEditable setRating={setRating}></Rating>

      <Input placeholder="Test" />
      <Textarea placeholder="Test" />
    </>
  );
}

export default withLayout(Home);

export const getStaticProps: GetStaticProps = async () => {
  const firstCategory = 0;
  const { data: menu } = await axios.post<MenuItem[]>(API.topPage.find, {
    firstCategory
  });

  return {
    props: {
      menu,
      firstCategory
    }
  };
};

interface HomeProps extends Record<string, unknown> {
  menu: MenuItem[];
  firstCategory: TopLevelCategory;
}
