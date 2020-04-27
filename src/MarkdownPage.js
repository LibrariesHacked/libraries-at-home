import React, { useEffect, useState } from 'react';
import ReactMarkdown from 'markdown-to-jsx';

import { withStyles } from '@material-ui/core/styles';

import Link from '@material-ui/core/Link';
import Typography from '@material-ui/core/Typography';

const styles = (theme) => ({
  listItem: {
    marginTop: theme.spacing(1),
  }
});

const options = {
  overrides: {
    h1: {
      component: Typography,
      props: {
        gutterBottom: true,
        variant: 'h3',
        color: 'secondary'
      },
    },
    h2: { component: Typography, props: { gutterBottom: true, variant: 'h4', color: 'secondary' } },
    h3: { component: Typography, props: { gutterBottom: true, variant: 'h5', color: 'secondary' } },
    h4: {
      component: Typography,
      props: { gutterBottom: true, variant: 'h6', paragraph: true, color: 'secondary' },
    },
    p: { component: Typography, props: { paragraph: true, color: 'secondary' } },
    a: { component: Link },
    li: {
      component: withStyles(styles)(({ classes, ...props }) => (
        <li className={classes.listItem}>
          <Typography component="span" {...props} />
        </li>
      )),
    },
  },
};

function MarkdownPage(props) {
  const { page } = props;
  const [page_text, setPageText] = useState('');

  useEffect(() => {
    async function fetchPage() {
      const page_data = await fetch(page);
      const page_text = await page_data.text();
      setPageText(page_text);
    }
    fetchPage();
  }, [page])

  return <ReactMarkdown options={options} {...props}>{page_text}</ReactMarkdown>;
}

export default MarkdownPage;