defmodule Juicebox.PageController do
  use Juicebox.Web, :controller

  def index(conn, _params) do
    if get_session(conn, :current_user) do
      %{ name: name } = get_session(conn, :current_user)
      render conn, "index.html", current_user: name
    else
      render conn, "index_logged_out.html"
    end
  end
end
