//Création d'un lecteur audio à partir d'une source

export const Audio = ({ audioUrl }: any) => {

  return <audio controls src={audioUrl} />;
};