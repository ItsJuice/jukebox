defmodule Juicebox.StreamChannel do
  use Phoenix.Channel

  def join("stream:" <> stream_id, _params, socket) do
    {:ok, socket}
  end

  def handle_in("video.added", %{"video_id" => video_id}, socket) do
    IO.puts "video.added: #{video_id}"
    broadcast! socket, "video.added", %{video_id: video_id}

    {:noreply, socket}
  end

  def handle_out("video.added", payload, socket) do
    push socket, "video.added", payload

    {:noreply, socket}
  end
end
