defmodule JuiceboxWeb.ApiController do
  use JuiceboxWeb.Web, :controller

  def videos(conn, params) do
    case JuiceboxStream.Youtube.Client.search(params["q"]) do

      # Handle CORS
      plug Head
      plug Corsica, origins: "http://localhost:4000"

      # Process action
      {:ok, videos} ->
        render(conn, videos: videos)
      _ ->
        conn
        |> put_status(500)
        |> json(%{error: "Unable to fetch results"})
    end
  end
end
