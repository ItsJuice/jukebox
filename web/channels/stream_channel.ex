defmodule Juicebox.StreamChannel do
  use Phoenix.Channel

  def join("stream:" <> stream_id, _params, socket) do
    {:ok, socket}
  end

  def handle_in("video.added", %{"video_id" => video_id}, socket) do
    IO.puts "video.added: #{video_id}"

    video = Video.find_or_create( %{video_id: video_id} )
    changeset = Video.increment_queued_count_changeset(video)

    case Juicebox.Repo.update(changeset) do
      {:ok, video} ->
        broadcast! socket, "video.added", %{ video_id: video.video_id, queued_count: video.queued_count }
      {:error, changeset} ->
        broadcast! socket, "video.error", %{ error: changeset.errors }
    end
    
    {:noreply, socket}
  end

  def handle_out("video.added", payload, socket) do
    push socket, "video.added", payload

    {:noreply, socket}
  end
end
