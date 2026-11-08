from rest_framework import serializers

from .models import Conversation, Message


class MessageSerializer(serializers.ModelSerializer):
    sender_name = serializers.ReadOnlyField(source='sender.name')

    class Meta:
        model = Message
        fields = ['id', 'conversation', 'sender', 'sender_name', 'text', 'read', 'created_at']
        read_only_fields = ['sender']

    def create(self, validated_data):
        validated_data['sender'] = self.context['request'].user
        return super().create(validated_data)


class ConversationSerializer(serializers.ModelSerializer):
<<<<<<< HEAD
    startup_slug = serializers.ReadOnlyField(source='startup.slug')
=======
>>>>>>> d78196070a7a5dd22091f54210690a25e1df3d5c
    startup_name = serializers.ReadOnlyField(source='startup.name')
    initiator_name = serializers.ReadOnlyField(source='initiator.name')
    messages = MessageSerializer(many=True, read_only=True)

    class Meta:
        model = Conversation
<<<<<<< HEAD
        fields = ['id', 'startup', 'startup_slug', 'startup_name', 'initiator', 'initiator_name', 'created_at', 'messages']
=======
        fields = ['id', 'startup', 'startup_name', 'initiator', 'initiator_name', 'created_at', 'messages']
>>>>>>> d78196070a7a5dd22091f54210690a25e1df3d5c
        read_only_fields = ['initiator']

    def create(self, validated_data):
        validated_data['initiator'] = self.context['request'].user
        return super().create(validated_data)
