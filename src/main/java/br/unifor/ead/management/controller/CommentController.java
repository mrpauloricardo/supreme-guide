package br.unifor.ead.management.controller;

import br.unifor.ead.management.entity.Comment;
import br.unifor.ead.management.entity.Subject;
import br.unifor.ead.management.repository.CommentRepository;
import br.unifor.ead.management.repository.SubjectRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

@RestController
@RequestMapping("/comments")
public class CommentController {

    @Autowired
    private CommentRepository commentRepository;

    @Autowired
    private SubjectRepository subjectRepository;

    @PostMapping
    public ResponseEntity<?> createComment(@RequestBody Comment comment) {
        Optional<Subject> subjectOptional = subjectRepository.findById(comment.getSubjectId());

        if (subjectOptional.isPresent()) {
            Comment savedComment = commentRepository.save(comment);
            return new ResponseEntity<>(savedComment, HttpStatus.CREATED);
        } else {
            return new ResponseEntity<>("Subject not found", HttpStatus.BAD_REQUEST);
        }
    }
}

