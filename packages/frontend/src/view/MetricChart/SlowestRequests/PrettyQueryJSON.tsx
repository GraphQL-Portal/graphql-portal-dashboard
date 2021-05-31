export const PrettyQueryJSON: React.FC<{ query: any }> = ({ query }) => {
  return (
    <div
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(query)
          .replace(/\\n/g, '<br>')
          .replace(/\s/g, '&nbsp&nbsp')
          .replace(/\\"/g, '"'),
      }}
    ></div>
  );
};
