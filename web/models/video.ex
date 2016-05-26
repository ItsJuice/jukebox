defmodule Video do
  use Ecto.Schema
  import Ecto.Query
  import Ecto.Changeset

  schema "videos" do
    field :video_id, :string
    field :queued_count, :integer, default: 0
    timestamps
  end

  def find_or_create(video) do
    query = from v in Video,
            where: v.video_id == ^video.video_id

    video = Juicebox.Repo.one(query)

    if !video  do
      Juicebox.Repo.insert %Video{video_id: video.video_id}
      video = Juicebox.Repo.one(query)
    end

    video
  end

  def increment_queued_count_changeset(video) do
    video
    |> cast(%{queued_count: (video.queued_count+1)}, ~w(queued_count), ~w())
  end
end