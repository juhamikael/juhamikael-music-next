type TextBlockChild = {
  _key: string;
  _type: "span";
  marks: any[];
  text: string;
};

export type TextBlock = {
  _type: "block";
  style: "normal";
  _key: string;
  markDefs: any[];
  children: TextBlockChild[];
};

type ImageComponentProps = {
  asset: {
    _type: string;
    _ref: string;
  };
  _type: string;
  alt: string;
  _key: string;
};

export interface ImageComponent {
  value: ImageComponentProps;
  isInline: boolean;
}

export type IContactForm = {
  content: {
    _id: string;
    title: string;
    slug: {
      current: string;
    };
    text: TextBlock[];
  };
};
