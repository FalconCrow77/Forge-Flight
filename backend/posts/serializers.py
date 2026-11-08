from rest_framework import serializers

from .models import Post


class PostSerializer(serializers.ModelSerializer):
    startup_name = serializers.ReadOnlyField(source='startup.name')
    author_name = serializers.ReadOnlyField(source='author.name')
<<<<<<< HEAD
    likes_count = serializers.IntegerField(source='likes.count', read_only=True)
    is_liked = serializers.SerializerMethodField()
=======
>>>>>>> d78196070a7a5dd22091f54210690a25e1df3d5c

    class Meta:
        model = Post
        fields = [
            'id', 'kind', 'startup', 'startup_name', 'author', 'author_name',
            'post_type', 'title', 'text', 'tags', 'media', 'created_at',
<<<<<<< HEAD
            'likes_count', 'is_liked', 'pinned'
        ]
        read_only_fields = ['author']

    def get_is_liked(self, obj):
        request = self.context.get('request')
        if request and request.user.is_authenticated:
            return obj.likes.filter(id=request.user.id).exists()
        return False

=======
        ]
        read_only_fields = ['author']

>>>>>>> d78196070a7a5dd22091f54210690a25e1df3d5c
    def create(self, validated_data):
        validated_data['author'] = self.context['request'].user
        return super().create(validated_data)
